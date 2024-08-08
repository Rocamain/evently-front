'use server'
import { revalidatePath } from 'next/cache'
import { decryptSessionCookie } from '../auth/session'
const { DB_URL } = process.env

export type BookActionState =
  | {
      error?: string
      message?: string
    }
  | undefined

export type BookAction = (
  state: BookActionState,
  formData: FormData,
) => Promise<
  | {
      error: string
      message: undefined
    }
  | {
      error: undefined
      message: string
    }
>

interface User {
  Username: string
  UserAttributes: { Name: string; Value: string }[]
}

interface UserInfo {
  userId: string
  userName: string
  userEmail: string
  userPicture: string
}

export async function bookEventAction(
  state: BookActionState,
  formData: FormData,
): Promise<{ error?: string; message?: string }> {
  const eventId = formData.get('eventId')
  try {
    const session = await decryptSessionCookie()
    const response = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    if (!response.ok) {
      return {
        error: 'Something went wrong',
        message: undefined,
      }
    }

    const user: User = await response.json()

    const userInfo: UserInfo = {
      userId: user.Username,
      userName: `${user.UserAttributes[2].Value} ${user.UserAttributes[3].Value}`,
      userEmail: user.UserAttributes[0].Value,
      userPicture: user.UserAttributes[4].Value,
    }

    Object.entries(userInfo).forEach(([key, value]) => formData.set(key, value))
    formData.set('type', 'booking')

    const res = await fetch(`${DB_URL}/item`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: formData,
    })

    const parsedBody: unknown = await res.json()

    revalidatePath(`/event/${eventId}`)
    return {
      error: undefined,
      message: 'Booking done',
    }
  } catch (e) {
    return {
      error: 'Something went wrong',
      message: undefined,
    }
  }
}
