'server only'
const { DB_URL } = process.env
import { decryptSessionCookie } from '../auth/session'
import { Booking } from '@/types/event/event'
interface User {
  Username: string
  UserAttributes: { Name: string; Value: string }[]
}

export async function getBookedEventByUserId() {
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

    const response = await fetch(`${DB_URL}/items/byUser/${userId}`, {
      method: 'GET',
      next: { tags: ['byUser'] },
      cache: 'no-store',
    })

    const bookings: { data: Booking[] } = await response.json()

    return bookings.data[0]
  } catch (error) {
    throw error
  }
}
