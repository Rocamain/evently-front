import { type NextRequest, NextResponse, userAgent } from 'next/server'
import { verifySession } from './lib/auth/session'
import { PROTECTED_ROUTES } from './lib/utils/constants'

export async function middleware(request: NextRequest) {
  var pathname: string = request.nextUrl.pathname
  const ua = userAgent(request)
  console.log({ ua })
  const response = NextResponse.next()
  if (pathname === '/') {
    const ip =
      request.headers.get('x-forwarded-for') || request.ip || '127.0.0.1'
    const city = request.geo?.city
    if (city) {
      response.headers.set('X-City', city)
    }
    // Use ipapi for geolocation lookup
    // const response = await fetch(`https://ipapi.co/${ip}/json/`)
    // const geoData = await response.json()

    // const { city, region } = geoData
    console.log('Middleware', { geoData: request.geo, ip })
  }
  if (pathname.startsWith('/event')) {
    // Dynamic params eventId  rename pathname to indentify a protected route
    const paths = pathname.split('/')
    paths[2] = '[eventId]'
    pathname = paths.join(' ').replaceAll(' ', '/')
  }

  if (pathname.startsWith('/booking')) {
    // Dynamic params bookingId rename pathname to indentify a protected route
    const paths = pathname.split('/')
    paths[2] = '[bookingId]'
    pathname = paths.join(' ').replaceAll(' ', '/')
  }

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname)
  if (isProtectedRoute) {
    const isVerified = await verifySession()

    if (!isVerified) return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source:
        '/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)',
      missing: [
        // Exclude Server Actions
        { type: 'header', key: 'next-action' },
      ],
    },
  ],
}
