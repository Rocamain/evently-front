import BookEventPage from '@/app/(pages)/event/[eventId]/book/page'
export default function ModalBookEventPage({
  params,
}: {
  params: { eventId: string }
}) {
  return <BookEventPage params={params} />
}
