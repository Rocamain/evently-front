import Link from 'next/link'
import Image from 'next/image'
import { EventWithBookings } from '@/types/event/event'

const MONTHS: Array<string> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function EventCard({ event, bookings }: EventWithBookings) {
  const {
    eventDateAndTime,
    eventTitle,
    eventPictures,
    eventId,
    eventOwnerName,
  } = event
  const [eventDate, eventTime] = eventDateAndTime.split('T')

  const [year, month, day] = eventDate.split('-')
  const time = eventTime.split(':')[0] + ':' + eventTime.split(':')[1]

  return (
    <Link
      href={`event/${eventId}`}
      className="grow-0 shrink-0 w-auto flex h-full flex-col"
    >
      <div className="mb-3 w-[250px] h-[160px] overflow-hidden rounded-md">
        <Image
          src={eventPictures[0]}
          alt="event image"
          className="object-cover w-full h-full"
          width={350}
          height={220}
        />
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-red-400 line-clamp-3">
          {eventTitle}
        </h4>
        <h5 className="text-sm font-bold text-gray-600 line-clamp-3">
          Hosted by: {eventOwnerName}
        </h5>
      </div>
      <div>
        <h4 className="text-base uppercase text-teal-600 bold line-clamp-1">{`${day} ${
          MONTHS[Number(month)]
        } ${year} ${time}`}</h4>
      </div>
    </Link>
  )
}
