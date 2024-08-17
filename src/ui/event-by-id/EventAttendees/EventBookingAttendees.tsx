import { Attendee, Booking } from '@/types/event/event'
import { AttendeeCard } from './EventAttendeeCard'
import Image from 'next/image'
import EventRestOfAttendeesCard from './EventRestOfAttendeesCard'
interface EventBookingAttendeesProps {
  attendees: Attendee[]
}

export default function EventBookingAttendees({
  attendees,
}: {
  attendees: Attendee[]
}) {
  const firstAttendees = attendees?.slice(0, 2)
  const restAttendees = attendees?.slice(2)

  return (
    <>
      {firstAttendees &&
        firstAttendees.map((attendee, index) => (
          <AttendeeCard key={`attendees-link-${index}`} attendee={attendee} />
        ))}

      {restAttendees && (
        <EventRestOfAttendeesCard restOfAttendees={restAttendees} />
      )}
    </>
  )
}
