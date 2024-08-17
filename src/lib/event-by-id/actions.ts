'use server'
import { EventByID } from '@/types/event/event'
import { decryptSessionCookie } from '@/lib/auth/session'
import { revalidatePath } from 'next/cache'
const { DB_URL } = process.env

type UserInfoResponse = { userId: string | undefined }

export const getUserData = async (): Promise<UserInfoResponse> => {
  const { accessToken } = await decryptSessionCookie()
  if (accessToken) {
    try {
      const response = await fetch(`${DB_URL}/getuser`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await response.json()

      if (!response.ok) {
        return { userId: undefined }
      }
      return { userId: data.Username }
    } catch (e) {
      return { userId: undefined }
    }
  }
  return { userId: undefined }
}

export const getEventData = async (eventId: string) => {
  const response = await fetch(`${DB_URL}/item/${eventId}`, {
    method: 'GET',
    next: { tags: ['eventId'] },
  })
  const parsedData: EventByID = await response.json()

  revalidatePath(`/event/${eventId}`)
  return parsedData
}
