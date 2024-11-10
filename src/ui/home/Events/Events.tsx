import { EventWithBookings } from '@/types/event/event'
import EventCard from './EventCard'
type EventsProps = { events: Array<EventWithBookings> }

export default function Events({ events }: EventsProps) {
  return events.map((eventInfo) => (
    <EventCard
      key={eventInfo.event.eventId}
      event={eventInfo.event}
      bookings={eventInfo.bookings}
    />
  ))
}
