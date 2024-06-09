import { type NextRequest, NextResponse } from 'next/server'
import { verifySession } from './lib/auth/session'

const protectedRoutes = ['/dashboard', '/create-event']
const publicRoutes = ['/signin', '/register', '/']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  if (isProtectedRoute) {
    const isVerified = await verifySession()

    if (!isVerified) return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
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
