import { env } from '@/env';
import { protectedProcedure } from '@/trpc/procedures';
import { Octokit } from '@octokit/rest';
import packageJson from '../../../../../../package.json';

/**
 * Check for available updates by comparing current version with latest release
 */
export const checkForUpdates = protectedProcedure.query(async () => {
  // Try to get the latest release from GitHub
  try {
    const currentVersion = packageJson.version;
    const octokit = new Octokit();

    const { data: release } = await octokit.repos.getLatestRelease({
      owner: env.GITHUB_REPO_OWNER,
      repo: env.GITHUB_REPO_NAME
    });

    const latestVersion = release.tag_name.replace('v', '');

    return {
      currentVersion,
      latestVersion,
      updateAvailable: latestVersion !== currentVersion,
      releaseNotes: release.body || null,
      releaseUrl: release.html_url
    };
  } catch (error) {
    console.error('Failed to check for updates:', error);
    return {
      currentVersion: packageJson.version,
      latestVersion: packageJson.version,
      updateAvailable: false,
      releaseNotes: null,
      releaseUrl: null
    };
  }
});
