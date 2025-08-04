import { formatMessageServer } from '@/i18n/format-message-server';
import { createMetadata } from '@/utils/create-metadata';

export const metadata = createMetadata(async () => ({
  title: await formatMessageServer('Security / Settings')
}));
