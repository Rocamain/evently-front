import { getBooking } from '@/lib/booking/action'
import CancelEvent from '@/ui/cancel-event/cancelEvent'
export default async function CancelEventPage({
  params,
}: {
  params: { eventId: string }
}) {
  const { eventId } = params
  await getBooking({ eventId })

  return <CancelEvent eventId={eventId} />
}
