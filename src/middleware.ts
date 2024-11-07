import { type NextRequest, NextResponse, userAgent } from 'next/server'
import { verifySession } from './lib/auth/session'
import { PROTECTED_ROUTES } from './lib/utils/constants'

export async function middleware(request: NextRequest) {
  var pathname: string = request.nextUrl.pathname
  const { ua, device } = userAgent(request)
  const response = NextResponse.next()
  const viewport = device.type === 'mobile' || 'tablet' ? 'mobile' : 'desktop'
  if (pathname === '/' && ua !== 'Vercel Edge Functions') {
    response.headers.set('X-device', viewport)
    const url = request.nextUrl
    url.searchParams.set('viewport', viewport)

    const geo = request.geo
    if (geo?.city && geo?.latitude && geo?.longitude) {
      response.headers.set('X-City', geo.city)
      response.headers.set('X-Latitude', geo.latitude)
      response.headers.set('X-Longitude', geo.longitude)

      console.log('Middleware', { geoData: request.geo })
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

      if (!isVerified)
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
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
