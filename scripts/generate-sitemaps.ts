import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { websiteConfig } from '../src/config/website'

type Locale = keyof typeof websiteConfig.i18n.locales

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true })
}

function writeFile(filePath: string, content: string) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content)
}

function getBaseUrl() {
  let base = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  try {
    const u = new URL(base)
    if (process.env.NODE_ENV === 'production' && u.protocol === 'http:') {
      u.protocol = 'https:'
    }
    // strip trailing slash
    base = u.toString().replace(/\/$/, '')
  } catch {
    // leave as-is
  }
  return base
}

function locales(): { all: Locale[]; defaultLocale: Locale } {
  const all = Object.keys(websiteConfig.i18n.locales) as Locale[]
  const def = websiteConfig.i18n.defaultLocale as Locale
  return { all, defaultLocale: def }
}

function localizedPath(pathname: string, locale: Locale, defaultLocale: Locale): string {
  // localePrefix: 'as-needed' — default locale not prefixed; others are
  if (!pathname.startsWith('/')) pathname = `/${pathname}`
  return locale === defaultLocale ? pathname : `/${locale}${pathname}`
}

function xmlEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function urlEntry(loc: string, lastmod?: string, changefreq?: string, priority?: number) {
  const parts = [
    '<url>',
    `<loc>${xmlEscape(loc)}</loc>`,
    lastmod ? `<lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `<changefreq>${changefreq}</changefreq>` : null,
    typeof priority === 'number' ? `<priority>${priority}</priority>` : null,
    '</url>',
  ].filter(Boolean)
  return parts.join('')
}

function wrapUrlset(entries: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries.join('') +
    `</urlset>\n`
}

function wrapSitemapIndex(entries: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries.join('') +
    `</sitemapindex>\n`
}

function sitemapEntry(loc: string, lastmod?: string) {
  return `<sitemap><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</sitemap>`
}

// Load env with preference: .env.production > .env (do not let .env override production)
(() => {
  const root = process.cwd()
  const prod = path.join(root, '.env.production')
  const dev = path.join(root, '.env')
  if (fs.existsSync(prod)) {
    dotenv.config({ path: prod, override: true })
  }
  if (fs.existsSync(dev)) {
    dotenv.config({ path: dev, override: false })
  }
})()

async function generate() {
  const now = new Date().toISOString()
  const base = getBaseUrl()
  const pubDir = path.join(process.cwd(), 'public')
  const outDir = path.join(pubDir, 'sitemaps')
  ensureDir(outDir)

  // Ensure ads.txt exists
  const adsTxtPath = path.join(pubDir, 'ads.txt')
  if (!fs.existsSync(adsTxtPath)) {
    writeFile(adsTxtPath, '# ads.txt — add your advertising system records here\n')
  }

  const { all: allLocales, defaultLocale } = locales()

  // High-value core pages: homepage and tools page. Also include ads.txt as requested.
  const corePages = ['/', '/tools']
  const coreEntries: string[] = []
  for (const loc of allLocales) {
    for (const p of corePages) {
      const url = base + localizedPath(p, loc, defaultLocale)
      coreEntries.push(urlEntry(url, now, 'weekly', p === '/' ? 1 : 0.8))
    }
  }
  // Include ads.txt URL itself
  coreEntries.push(urlEntry(`${base}/ads.txt`, now, 'yearly', 0.3))
  writeFile(path.join(outDir, 'pages.xml'), wrapUrlset(coreEntries))

  // Blog posts (published only, exclude noindex)
  const blogEntries: string[] = []
  const blogDir = path.join(process.cwd(), 'content', 'blog')
  const files = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : []
  const slugByLocale: Record<string, { slug: string; locale: string }[]> = {}
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue
    const full = path.join(blogDir, file)
    const text = fs.readFileSync(full, 'utf8')
    const fm = extractFrontmatter(text)
    const published = toBool(fm.published)
    const noindex = toBool(fm.noindex)
    if (!published || noindex) continue
    const { slug, locale } = getSlugAndLocale(file, allLocales as string[], defaultLocale)
    if (!slugByLocale[locale]) slugByLocale[locale] = []
    slugByLocale[locale].push({ slug, locale })
  }
  for (const loc of allLocales) {
    const list = slugByLocale[loc] || []
    for (const { slug } of list) {
      const slugPath = `/blog/${slug}`
      const url = base + localizedPath(slugPath, loc, defaultLocale)
      blogEntries.push(urlEntry(url, now, 'weekly', 0.8))
    }
  }
  writeFile(path.join(outDir, 'blog-posts.xml'), wrapUrlset(blogEntries))

  // Sitemap index
  const indexEntries = [
    sitemapEntry(`${base}/sitemaps/pages.xml`, now),
    sitemapEntry(`${base}/sitemaps/blog-posts.xml`, now),
  ]
  writeFile(path.join(pubDir, 'sitemap.xml'), wrapSitemapIndex(indexEntries))
}

generate().catch((err) => {
  console.error('[sitemaps] generation failed:', err)
  process.exit(1)
})

// -------- helpers ---------
function extractFrontmatter(text: string): Record<string, string> {
  // Very small YAML-like parser for frontmatter at file start
  // Looks for: ---\n...\n---
  const m = text.match(/^---\n([\s\S]*?)\n---/)
  const obj: Record<string, string> = {}
  if (!m) return obj
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    obj[key] = val
  }
  return obj
}

function toBool(v: string | undefined): boolean {
  if (!v) return false
  const s = v.replace(/^['"]|['"]$/g, '').toLowerCase()
  return s === 'true' || s === '1' || s === 'yes'
}

function getSlugAndLocale(filename: string, locales: string[], defaultLocale: string) {
  // filename formats: name.mdx, name.<locale>.mdx
  let base = filename.replace(/\.mdx$/, '')
  let locale = defaultLocale
  for (const loc of locales) {
    if (base.endsWith('.' + loc)) {
      base = base.slice(0, -1 * (loc.length + 1))
      locale = loc
      break
    }
  }
  return { slug: base, locale }
}
