import { verifySession } from '@/lib/auth/session'
import BookEvent from '@/ui/book-event/BookEvent'
import BookEventAuth from '@/ui/book-event/BookEventAuth'

export default async function BookEventPage({
  params,
}: {
  params: { eventId: string }
}) {
  const isUser = await verifySession()

  if (isUser && params?.eventId) {
    return <BookEvent eventId={params.eventId} />
  }
  return <BookEventAuth />
}
