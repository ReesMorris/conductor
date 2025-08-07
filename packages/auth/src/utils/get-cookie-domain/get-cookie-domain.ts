/**
 * Utility function to determine the appropriate cookie domain based on the provided domain string.
 * This function ensures that the cookie domain is formatted correctly for different types of domains.
 * It handles single-part domains, two-part domains, and subdomains appropriately.
 *
 * @param domain - The domain string to process, e.g., 'example.com', 'sub.example.com', or 'localhost'.
 * @returns A string representing the cookie domain, formatted with a leading dot for two-part and subdomains.
 */
export const getCookieDomain = (domain: string): string => {
  const parts = domain.split('.');

  // If the domain is a single part (like 'localhost'), return it as is
  if (parts.length === 1) {
    return domain;
  }

  // If the domain has two parts (like 'example.com'), prefix with a dot
  if (parts.length === 2) {
    return `.${domain}`;
  }

  // For domains with more than two parts (like 'sub.example.com'), return the last two parts prefixed with a dot
  if (parts.length > 2) {
    return `.${parts.slice(-2).join('.')}`;
  }

  // Fallback to the original domain if no conditions match
  return domain;
};
