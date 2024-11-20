import { Booking, Evento, Events as EventType } from '@/types/event/event'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import Events from '../Events/Events'
const { DB_URL } = process.env

const EventsFetcher = async (): Promise<EventType> => {
  const response = await fetch(
    `${DB_URL}/items/byUser/event-online?withBookings=true`,
    {
      method: 'GET',
      next: { revalidate: 0, tags: ['eventOnlineFetcher'] },
    },
  )

  const parsedData: Array<{ items: Array<Evento | Booking>; count: number }> =
    await response.json()
  if (parsedData.length === 0) {
  }
  const isEvent = (item: Evento | Booking): item is Evento => {
    return item.type === 'event-online'
  }

  const events = parsedData.map(({ items }) => {
    const eventIndex = items.findIndex(isEvent)
    if (eventIndex === -1) {
      throw new Error('No event found in items.')
    }

    const event = items[eventIndex] as Evento

    const bookings = items.filter((item) => item !== event) as Booking[]
    return { event, bookings }
  })
  return events
}

export default async function OnlineEvents() {
  const onlineEvents = await EventsFetcher()
  return (
    <section id="online_events" className="mb-20">
      <div className="mb-10">
        <h3 className="font-semibold text-2xl sm:text-3xl mb-2">
          Events online
        </h3>
        {onlineEvents.length > 4 && (
          <LinkButton href="#">More events</LinkButton>
        )}
      </div>
      {onlineEvents.length === 0 ? (
        <h5 className="text-2xl sm:text-3xl mb-2">
          There are not events online published
        </h5>
      ) : (
        <Events events={onlineEvents} />
      )}
    </section>
  )
}
