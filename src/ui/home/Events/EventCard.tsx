import Link from 'next/link'
import Image from 'next/image'
import { EventWithBookings } from '@/types/event/event'
import {
  CalendarDaysIcon,
  UserIcon,
  CurrencyPoundIcon,
} from '@heroicons/react/16/solid'

// import { CurrencyPoundIcon } from '@heroicons/react/24/outline'

export default function EventCard({ event, bookings }: EventWithBookings) {
  const {
    eventDateAndTime,
    eventTitle,
    eventPictures,
    eventId,
    eventOwnerName,
    eventPrice,
  } = event

  return (
    <Link href={`event/${eventId}`} className="">
      <div className="mb-2 rounded-md overflow-hidden w-full aspect-[16/9]">
        <Image
          src={eventPictures[0]}
          alt="event image"
          className="object-cover w-full h-full"
          width={350}
          height={220}
        />
      </div>

      <div className="mb-1">
        <h4 className="mb-1 text-lg font-semibold text-gray-600">
          {eventTitle}
        </h4>
        <h5 className="text-sm font-semibold text-gray-600">
          Hosted by: <span className="font-medium">{eventOwnerName}</span>
        </h5>
      </div>
      <div className="flex mb-1">
        <CalendarDaysIcon className="h-[1.2rem] mr-1 text-sm text-gray-600 bold" />
        <p className="text-sm text-gray-600 bold">
          {new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          }).format(new Date(eventDateAndTime))}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex">
          <UserIcon className="h-[1.2rem] mr-1 text-sm text-gray-600 bold line-clamp-1" />
          <p className="text-sm text-gray-600 bold">
            {bookings.length + 1} attending
          </p>
        </div>
        <div className="flex">
          <CurrencyPoundIcon className="h-[1.2rem] mr-1 text-sm text-gray-600 bold line-clamp-1" />
          <p className="text-sm text-gray-600 bold line-clamp-1">
            {eventPrice === 0 ? 'Free' : eventPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
}
