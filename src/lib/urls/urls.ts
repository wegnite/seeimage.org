import { routing } from '@/i18n/routing';
import type { Locale } from 'next-intl';

// Derive base URL with sensible production safety:
// - Prefer explicit NEXT_PUBLIC_BASE_URL
// - Fallback to localhost in dev
// - If running in production and scheme is http, upgrade to https to avoid mixed-content/insecure URLs
// Public base URL resolution policy (unified for canonical/sitemap/robots)
// - Prefer explicit NEXT_PUBLIC_BASE_URL
// - In production, if missing, fallback to brand domain to avoid localhost/workers.dev
// - In development, fallback to localhost
const PROD_FALLBACK_BASE = 'https://seeimage.org';

// Compute once at build time to leverage Next's env inlining for NEXT_PUBLIC_*.
const derivedBaseUrl: string = (() => {
  let base = process.env.NEXT_PUBLIC_BASE_URL as string | undefined;
  if (!base) {
    base = process.env.NODE_ENV === 'production'
      ? PROD_FALLBACK_BASE
      : `http://localhost:${process.env.PORT ?? 3000}`;
  }
  try {
    const u = new URL(base);
    if (process.env.NODE_ENV === 'production') {
      u.protocol = 'https:';
    }
    return u.toString().replace(/\/$/, '');
  } catch {
    return base!;
  }
})();

/**
 * Get the base URL of the application
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    // On the client, always trust the current origin
    return window.location.origin;
  }
  return derivedBaseUrl;
}

/**
 * Ensure URL has a trailing slash in its pathname (keeps query/hash)
 */
export function ensureTrailingSlash(url: string): string {
  try {
    const u = new URL(url);
    if (!u.pathname.endsWith('/')) {
      u.pathname = `${u.pathname}/`;
    }
    return u.toString();
  } catch {
    // If it's not a full URL, best effort
    if (url.includes('?')) {
      const [p, q] = url.split('?');
      return (p.endsWith('/') ? url : `${p}/?${q}`);
    }
    return url.endsWith('/') ? url : `${url}/`;
  }
}

/**
 * Check if the locale should be appended to the URL
 */
export function shouldAppendLocale(locale?: Locale | null): boolean {
  return !!locale && locale !== routing.defaultLocale && locale !== 'default';
}

/**
 * Get the URL of the application with the locale appended
 */
export function getUrlWithLocale(url: string, locale?: Locale | null): string {
  const base = derivedBaseUrl;
  const rawPath = shouldAppendLocale(locale)
    ? `/${locale}${url || '/'}`
    : (url || '/');
  // normalize duplicate slashes in path portion only
  const normalizedPath = rawPath.replace(/\/+([?#]|$)/, '/$1');
  const full = new URL(normalizedPath, base).toString();
  return ensureTrailingSlash(full);
}

/**
 * Adds locale to the callbackURL parameter in authentication URLs
 *
 * Example:
 * Input: http://localhost:3000/api/auth/reset-password/token?callbackURL=/auth/reset-password
 * Output: http://localhost:3000/api/auth/reset-password/token?callbackURL=/zh/auth/reset-password
 *
 * http://localhost:3000/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=/dashboard
 * Output: http://localhost:3000/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=/zh/dashboard
 *
 * @param url - The original URL with callbackURL parameter
 * @param locale - The locale to add to the callbackURL
 * @returns The URL with locale added to callbackURL if necessary
 */
export function getUrlWithLocaleInCallbackUrl(
  url: string,
  locale: Locale
): string {
  // If we shouldn't append locale, return original URL
  if (!shouldAppendLocale(locale)) {
    return url;
  }

  try {
    // Parse the URL
    const urlObj = new URL(url);

    // Check if there's a callbackURL parameter
    const callbackURL = urlObj.searchParams.get('callbackURL');

    if (callbackURL) {
      // Only modify the callbackURL if it doesn't already include the locale
      if (!callbackURL.match(new RegExp(`^/${locale}(/|$)`))) {
        // Add locale to the callbackURL
        const localizedCallbackURL = callbackURL.startsWith('/')
          ? `/${locale}${callbackURL}`
          : `/${locale}/${callbackURL}`;

        // Update the search parameter
        urlObj.searchParams.set('callbackURL', localizedCallbackURL);
      }
    }

    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return the original URL
    console.warn('Failed to parse URL for locale insertion:', url, error);
    return url;
  }
}

/**
 * Get the URL of the image, if the image is a relative path, it will be prefixed with the base URL
 * @param image - The image URL
 * @returns The URL of the image
 */
export function getImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  if (image.startsWith('/')) {
    return `${getBaseUrl()}${image}`;
  }
  return `${getBaseUrl()}/${image}`;
}

/**
 * Get the Stripe dashboard customer URL
 * @param customerId - The Stripe customer ID
 * @returns The Stripe dashboard customer URL
 */
export function getStripeDashboardCustomerUrl(customerId: string): string {
  if (process.env.NODE_ENV === 'development') {
    return `https://dashboard.stripe.com/test/customers/${customerId}`;
  }
  return `https://dashboard.stripe.com/customers/${customerId}`;
}
