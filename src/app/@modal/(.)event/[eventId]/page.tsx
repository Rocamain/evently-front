import ModalBookEventPage from './book/page'

export default function page({ params }: { params: { eventId: string } }) {
  return <ModalBookEventPage params={params} />
}
