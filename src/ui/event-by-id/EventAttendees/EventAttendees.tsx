import React from 'react'
import EventBookingAttendees from './EventBookingAttendees'
import { Attendee, Evento } from '@/types/event/event'
import { AttendeeCard } from './EventAttendeeCard'
interface EventAttendeesProps {
  eventId: string
  bookings?: Attendee[] | Evento[]
  host: Attendee
}

export const EventAttendees: React.FC<EventAttendeesProps> = ({
  eventId,
  bookings,
  host,
}) => {
  return (
    <div id="attendees" className="md:max-w-screen w-full mt-5 pt-10">
      <div className="flex justify-between items-center mb-5 mx-4">
        <h2 className="font-semibold text-xl">
          Attendees ({bookings?.length ? bookings?.length + 2 : 1})
        </h2>
        <a
          id="attendees-link"
          href={`/event/${eventId}/attendees/`}
          className="text-red-500 font-semibold"
        >
          See all
        </a>
      </div>
      <div>
        <div className="bg-white">
          <div className="grid grid-flow-col p-6 gap-6 sm:grid-flow-row sm:grid-cols-4 overflow-auto">
            <AttendeeCard attendee={host} />
            {/* <EventBookingAttendees attendees={bookings} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
