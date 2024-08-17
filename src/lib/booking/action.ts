'use server'
import { Booking } from '@/types/event/event'
import { decryptSessionCookie } from '../auth/session'
const { DB_URL } = process.env

export const getBooking = async ({ eventId }: { eventId: string }) => {
  try {
    const session = await decryptSessionCookie()
    const getUserResponse = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      next: { tags: ['getBooking'] },
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    const user: { Username: string } = await getUserResponse.json()

    if (user) {
      const userId = user.Username

      if (!userId) {
        return
      }
      const getBookingresponse = await fetch(
        `${DB_URL}/item/${eventId}-${userId}`,
        {
          method: 'GET',
        },
      )

      const booking: { data: Booking } = await getBookingresponse.json()

      return booking.data
    }
  } catch (error) {
    throw error
  }
}
