'use server'
import { redirect } from 'next/navigation'
import { decryptSessionCookie } from '../auth/session'
const { DB_URL } = process.env

export async function bookEventAction(
  state: undefined,
  formData: FormData,
): Promise<undefined> {
  try {
    const session = await decryptSessionCookie()
    const response = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    if (!response.ok!) {
      // do something
    }

    const user = await response.json()

    const userInfo = {
      userId: user.Username as string,
      userName:
        `${user.UserAttributes[2].Value} ${user.UserAttributes[3].Value}` as string,
      userEmail: user.UserAttributes[0].Value as string,
      userPicture: user.UserAttributes[4].Value as string,
    }

    Object.entries(userInfo).forEach(([key, value]) => formData.set(key, value))
    formData.set('type', 'booking')

    const res = await fetch(`${DB_URL}/item`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: formData,
    })

    const parsedBody: unknown = await res.json()
    console.log({ parsedBody })
  } catch (e) {}
}
