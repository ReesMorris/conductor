#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { createHash } from 'crypto';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate hash (same logic as runtime)
const generateHash = (message: string): string => {
  return createHash('sha256').update(message).digest('hex').substring(0, 8);
};

interface ExtractedMessage {
  hash: string;
  message: string;
  file: string;
  line: number;
}

async function extractMessages() {
  const messages: ExtractedMessage[] = [];
  const projectRoot = join(__dirname, '..');

  // Find all TypeScript/TSX files
  const files = await glob('src/**/*.{ts,tsx}', {
    cwd: projectRoot,
    absolute: true,
    ignore: ['**/node_modules/**', '**/*.test.*', '**/*.spec.*']
  });

  console.log(`Found ${files.length} files to process...`);

  // Extract formatMessage calls from each file
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    try {
      const ast = parse(content, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx']
      });

      traverse(ast, {
        CallExpression(path) {
          const { node } = path;
          const { callee } = node;

          // Check if it's a formatMessage or formatMessageServer call
          let isFormatMessageCall = false;

          // Direct call: formatMessage('...') or formatMessageServer('...')
          if (
            callee.type === 'Identifier' &&
            (callee.name === 'formatMessage' ||
              callee.name === 'formatMessageServer')
          ) {
            isFormatMessageCall = true;
          }
          // Method call: obj.formatMessage('...')
          else if (
            callee.type === 'MemberExpression' &&
            callee.property.type === 'Identifier' &&
            callee.property.name === 'formatMessage'
          ) {
            isFormatMessageCall = true;
          }

          if (
            isFormatMessageCall &&
            node.arguments.length > 0 &&
            node.arguments[0].type === 'StringLiteral'
          ) {
            const message = node.arguments[0].value;
            const hash = generateHash(message);

            messages.push({
              hash,
              message,
              file: file.replace(`${projectRoot}/`, ''),
              line: node.loc?.start.line || 0
            });
          }
        }
      });
    } catch (error) {
      console.error(`Error parsing ${file}:`, error);
    }
  }

  // Check for hash collisions
  const hashMap = new Map<string, ExtractedMessage[]>();
  for (const msg of messages) {
    const existing = hashMap.get(msg.hash) || [];
    existing.push(msg);
    hashMap.set(msg.hash, existing);
  }

  // Report collisions
  let hasCollisions = false;
  for (const [hash, msgs] of hashMap) {
    if (msgs.length > 1) {
      const uniqueMessages = [...new Set(msgs.map(m => m.message))];
      if (uniqueMessages.length > 1) {
        hasCollisions = true;
        console.error(`\nHash collision detected for hash '${hash}':`);
        for (const msg of msgs) {
          console.error(`  - "${msg.message}" in ${msg.file}:${msg.line}`);
        }
      }
    }
  }

  if (hasCollisions) {
    console.error('\nPlease modify the colliding messages to be unique.');
    process.exit(1);
  }

  const enJsonPath = join(projectRoot, 'src/i18n/messages/en.json');

  // Build translations from extracted messages only
  const translations: Record<string, string> = {};
  for (const [hash, msgs] of hashMap) {
    translations[hash] = msgs[0].message;
  }

  // Sort by key for consistency
  const sortedTranslations = Object.keys(translations)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = translations[key];
        return acc;
      },
      {} as Record<string, string>
    );

  // Write back to en.json
  writeFileSync(enJsonPath, `${JSON.stringify(sortedTranslations, null, 2)}\n`);

  console.log(`\nExtracted ${messages.length} messages`);
  console.log(`Total translations: ${Object.keys(sortedTranslations).length}`);
}

// Run the extraction
extractMessages().catch(error => {
  console.error('Extraction failed:', error);
  process.exit(1);
});
