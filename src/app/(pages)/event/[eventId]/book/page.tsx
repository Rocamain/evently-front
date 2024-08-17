import { verifySession } from '@/lib/auth/session'
import BookEvent from '@/ui/book-event/BookEvent'
import BookEventAuth from '@/ui/book-event/BookEventAuth'
import { getBooking } from '@/lib/booking/action'
import { notFound } from 'next/navigation'
import { getEventData } from '@/lib/event-by-id/actions'

export default async function BookEventPage({
  params: { eventId },
}: {
  params: { eventId: string }
}) {
  const event = await getEventData(eventId)
  const booking = await getBooking({ eventId })
  const isUser = await verifySession()
  const hasBooking = booking?.bookingId
  if (!event) {
    notFound()
  }

  if (isUser && eventId) {
    return <BookEvent hasBooking={Boolean(hasBooking)} eventId={eventId} />
  }
  return <BookEventAuth />
}
