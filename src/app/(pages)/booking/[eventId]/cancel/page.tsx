import Image from 'next/image'
import CancelBooking from '@/ui/cancel-booking/CancelBooking'
import { getBooking } from '@/lib/booking/action'
import { Booking } from '@/types/event/event'

export default async function CancelBookingPage({
  params,
}: {
  params: { eventId: string }
}) {
  const booking = (await getBooking({ eventId: params.eventId })) as Booking

  return <CancelBooking eventId={params.eventId} userName={booking.userName} />
}
