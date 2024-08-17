'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
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

    if (!res.ok) {
      return {
        error: 'Something went wrong',
        message: undefined,
      }
    }
    return {
      error: undefined,
      message: 'Booking done',
    }
  } catch (e) {
    return {
      error: 'Something went wrong',
      message: undefined,
    }
  } finally {
    revalidateTag(`eventId`)
  }
}

export async function cancelBookingAction(
  state: BookActionState,
  formData: FormData,
): Promise<{ error?: string; message?: string }> {
  const bookingId = formData.get('bookingId') as string
  const eventId = formData.get('eventId')
  try {
    const session = await decryptSessionCookie()
    const getUserResponse = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!getUserResponse.ok) {
      return {
        error: 'Something went wrong',
        message: undefined,
      }
    }

    const user: User = await getUserResponse.json()
    const userId = user.Username

    const res = await fetch(`${DB_URL}/item/${eventId}-${userId}`, {
      method: 'Delete',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!res.ok) {
      return {
        error: 'Something went wrong',
        message: undefined,
      }
    }

    revalidatePath(`/booking/${bookingId}/cancel`)
    revalidateTag('eventId')
    revalidatePath(`/event/${eventId}`)

    return {
      error: undefined,
      message: 'Booking canceled',
    }
  } catch (e) {
    return {
      error: 'Something went wrong',
      message: undefined,
    }
  }
}

export async function cancelEventAction(
  state: BookActionState,
  formData: FormData,
): Promise<{ error?: string; message?: string }> {
  const eventId = formData.get('eventId') as string
  try {
    const session = await decryptSessionCookie()

    const res = await fetch(`${DB_URL}/item/${eventId}-event`, {
      method: 'Delete',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })
    if (!res.ok) {
      return {
        error: 'Something went wrong',
        message: undefined,
      }
    }

    revalidateTag('eventId')
    revalidatePath(`/event/${eventId}`)

    return {
      error: undefined,
      message: 'Event canceled',
    }
  } catch (e) {
    return {
      error: 'Something went wrong',
      message: undefined,
    }
  }
}
