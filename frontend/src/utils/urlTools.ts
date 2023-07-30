/**
 * Checks if a string is a valid URL and returns the URL or null otherwise.
 */
export function isUrl(s: string | null): string | null {
  if (!s) {
    return null;
  } else if (s.startsWith('http://') || s.startsWith('https://')) {
    return s;
  } else if (s.startsWith('www.')) {
    return 'https://' + s;
  } else {
    return null;
  }
}

const startsWithWwwRe = /^www\./i;

const fallbackDomainRe = /^(https?:\/\/)?([\w.]+)\//i;

/**
 * Human friendly domain (short hostname) from a URL. Gracefully accept malformed URLs.
 */
export const urlToDomain = (url: string) => {
  try {
    return url && new URL(url).hostname.replace(startsWithWwwRe, '');
  } catch (e) {
    return url.match(fallbackDomainRe)?.[2] || url;
  }
};
