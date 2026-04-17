import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirectData from '@/lib/redirects.json'

const KEEP = new Set<string>(redirectData.keep)
const REDIRECT = new Set<string>(redirectData.redirect)

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const clean = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname

  // Skip app routes
  if (
    clean.startsWith('/blog') ||
    clean.startsWith('/category') ||
    clean.startsWith('/author') ||
    clean.startsWith('/_next') ||
    clean === '/about' ||
    clean === '/contact' ||
    clean === '/privacy-policy' ||
    clean === '/feed' ||
    clean === '/sitemap.xml' ||
    clean === '/robots.txt'
  ) {
    return NextResponse.next()
  }

  // Ghost tag/page/author paths
  if (
    pathname.startsWith('/tag/') ||
    pathname.startsWith('/page/') ||
    pathname.startsWith('/author/')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  const slug = clean.replace(/^\//, '')

  if (KEEP.has(slug)) {
    const url = request.nextUrl.clone()
    url.pathname = `/blog/${slug}`
    return NextResponse.redirect(url, 301)
  }

  if (REDIRECT.has(slug)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
