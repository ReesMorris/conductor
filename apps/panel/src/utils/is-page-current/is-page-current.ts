/**
 * Determines if a given path matches the current page path.
 *
 * @param currentPath - The current page path to check against
 * @param targetPath - The target path to compare with the current path
 * @returns `true` if the current path matches or starts with the target path, `false` otherwise
 * ```
 */
export const isPageCurrent = (
  currentPath?: string,
  targetPath?: string
): boolean => {
  if (targetPath === '/') {
    return currentPath === '/';
  }

  if (targetPath) {
    return currentPath?.startsWith(targetPath) ?? false;
  }

  return false;
};
