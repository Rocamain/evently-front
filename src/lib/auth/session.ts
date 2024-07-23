import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify, JWTPayload } from 'jose'
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt({
  accessToken,
  expiresAt,
}: {
  accessToken: string
  expiresAt: Date
}) {
  return new SignJWT({ accessToken })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    throw error
  }
}

export async function createSession(accessToken: string, expires: number) {
  const expiresAt = new Date(Date.now() + expires * 1000)
  const session = await encrypt({ accessToken, expiresAt })

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  })
}

export async function deleteSession() {
  await cookies().delete('session')
}

export async function verifySession() {
  const cookie = cookies().get('session')?.value
  if (!cookie) {
    return false
  }
  const session = await decrypt(cookie)

  if (session?.accessToken) {
    return true
  }
  return false
}

export async function decryptSessionCookie() {
  const cookie = cookies().get('session')?.value
  //
  if (!cookie) {
    return { accessToken: undefined }
  }
  try {
    const session = await decrypt(cookie)

    return session
  } catch (e) {
    await deleteSession()
    return { accessToken: undefined }
  }
}
