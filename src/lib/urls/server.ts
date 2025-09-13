import { headers } from 'next/headers';

/**
 * Get base URL from the incoming request headers on the server.
 * Falls back to https if protocol is not provided.
 */
/**
 * Resolve a public base URL on the server with safe priorities:
 * 1) Explicit NEXT_PUBLIC_BASE_URL
 * 2) Request headers host/proto
 * 3) Production fallback to brand domain
 * 4) Dev fallback to localhost
 */
export async function getServerPublicBaseUrl(): Promise<string> {
  const PROD_FALLBACK = 'https://seeimage.org';

  // 1) Prefer env if available (when bundled/inlined or populated)
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase) {
    try {
      const u = new URL(envBase);
      u.protocol = 'https:'; // ensure https in prod-like usage
      return u.toString().replace(/\/$/, '');
    } catch {
      return envBase.replace(/\/$/, '');
    }
  }

  // 2) Try request headers
  try {
    const hdrs = await (headers() as any);
    const host = hdrs.get('x-forwarded-host') || hdrs.get('host');
    const proto = hdrs.get('x-forwarded-proto') || 'https';
    if (host) {
      const url = `${proto}://${host}`.replace(/\/$/, '');
      // Avoid localhost leaking in production by falling back to brand domain
      if (process.env.NODE_ENV === 'production' && /localhost(:\d+)?$/.test(host)) {
        return PROD_FALLBACK;
      }
      return url;
    }
  } catch {
    // ignore
  }

  // 3/4) Fallbacks
  return process.env.NODE_ENV === 'production'
    ? PROD_FALLBACK
    : `http://localhost:${process.env.PORT ?? 3000}`;
}
