import { EventWithBookings } from '@/types/event/event'
import EventCard from './EventCard'
type EventsProps = { events: Array<EventWithBookings> }

export default function Events({ events }: EventsProps) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 lg:gap-x-4">
      {events.map((eventInfo) => (
        <EventCard
          key={eventInfo.event.eventId}
          event={eventInfo.event}
          bookings={eventInfo.bookings}
        />
      ))}
    </div>
  )
}
