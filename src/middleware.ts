import { type NextRequest, NextResponse } from 'next/server'
import { verifySession } from './lib/auth/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/signin', '/register', '/']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  if (isProtectedRoute) {
    const isVerified = await verifySession()
    if (!isVerified) return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
