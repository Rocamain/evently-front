import { type NextRequest, NextResponse, userAgent } from 'next/server'
import { verifySession } from './lib/auth/session'
import { PROTECTED_ROUTES } from './lib/utils/constants'
import { Console } from 'console'

export async function middleware(request: NextRequest) {
  var pathname: string = request.nextUrl.pathname
  const { ua, device } = userAgent(request)
  const geo = request.geo

  const response = NextResponse.next()
  const viewport =
    device.type === 'mobile' || device.type === 'tablet' ? 'mobile' : 'desktop'
  if (ua !== 'Vercel Edge Functions') {
    response.cookies.set('X-Device', viewport)
    console.log(geo)
    if (geo?.city && geo?.latitude && geo?.longitude) {
      const { city, latitude, longitude } = geo
      response.cookies.set('X-City', city)
      response.cookies.set('X-Latitude', latitude)
      response.cookies.set('X-Longitude', longitude)
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
