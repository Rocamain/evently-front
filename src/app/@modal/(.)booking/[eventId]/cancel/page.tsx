import CancelBookingPage from '@/app/(pages)/booking/[eventId]/cancel/page'

export default function ModalCancelPage({
  params,
}: {
  params: { eventId: string }
}) {
  return <CancelBookingPage params={params} />
}
