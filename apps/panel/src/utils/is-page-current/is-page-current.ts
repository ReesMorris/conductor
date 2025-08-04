/**
 * Determines if a given path matches the current page path.
 *
 * @param currentPath - The current page path to check against
 * @param targetPath - The target path to compare with the current path
 * @param exact - If true, requires exact match. If false, checks if current path starts with target path
 * @returns `true` if the paths match according to the exact parameter, `false` otherwise
 */
export const isPageCurrent = (
  currentPath?: string,
  targetPath?: string,
  exact = false
): boolean => {
  if (!targetPath || !currentPath) {
    return false;
  }

  if (exact) {
    return currentPath === targetPath;
  }

  // For non-exact matching, special case for root path
  if (targetPath === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(targetPath);
};
