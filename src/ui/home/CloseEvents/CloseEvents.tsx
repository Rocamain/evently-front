import { Booking, Evento, Events as EventType } from '@/types/event/event'
import { fetchGeo } from '@/lib/utils/geo'
import EditLocationButton from './EditLocationButton'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import Events from '../Events/Events'
const { DB_URL } = process.env

interface EventFetchParams {
  city: string | null
  latitude: string | null
  longitude: string | null
}
const EventsFetcher = async ({
  city,
  latitude,
  longitude,
}: EventFetchParams): Promise<EventType> => {
  const response = await fetch(
    `${DB_URL}/items/byUser/event?withBookings=true&latitude=${latitude}&longitude=${longitude}&radius=${500}`,
    {
      method: 'GET',
      next: { revalidate: 6000, tags: ['eventFetcher'] },
    },
  )

  const parsedData: Array<{ items: Array<Evento | Booking>; count: number }> =
    await response.json()
  if (parsedData.length === 0) {
  }
  const isEvent = (item: Evento | Booking): item is Evento => {
    return item.type === 'event'
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

export default async function CloseEvents() {
  const { city, latitude, longitude } = await fetchGeo()

  const closeEvents = await EventsFetcher({ city, latitude, longitude })
  return (
    <section id="online_events" className="mb-20">
      <div className="mb-10">
        <h3 className="font-semibold text-2xl sm:text-3xl mb-2">
          Events <EditLocationButton>{city}</EditLocationButton>
        </h3>
        {closeEvents.length > 4 && (
          <LinkButton href="#">More events</LinkButton>
        )}
      </div>
      {closeEvents.length === 0 ? (
        <h5 className="text-2xl sm:text-3xl mb-2">{`There are not event found in ${city}`}</h5>
      ) : (
        <Events events={closeEvents} />
      )}
    </section>
  )
}
