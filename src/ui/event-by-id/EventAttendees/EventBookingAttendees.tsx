import { Attendee, Booking } from '@/types/event/event'
import { AttendeeCard } from './EventAttendeeCard'
import Image from 'next/image'
interface EventBookingAttendeesProps {
  attendees: Attendee[]
}

export default function EventBookingAttendees({
  attendees,
  eventId,
}: {
  attendees: Attendee[]
  eventId: string
}) {
  const firstAttendees = attendees?.slice(0, 2)
  const restAttendees = attendees?.slice(2)

  // return <div> EventBookingAttendees</div>
  return (
    <>
      {firstAttendees &&
        firstAttendees.map((attendee, index) => (
          <AttendeeCard key={`attendees-link-${index}`} attendee={attendee} />
        ))}
      {restAttendees &&
        restAttendees.map((attendee, index) => (
          <AttendeeCard
            key={`attendees-link-rest-${index}`}
            attendee={attendee}
          />
        ))}
      {restAttendees && restAttendees.length > 1 && (
        <a href={`/event/${eventId}/attendees/`} className="hover:no-underline">
          <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
            <div className="relative">
              <div className="absolute z-10 top-6 right-5 text-xl font-medium text-white">
                +{restAttendees.length - 3}
              </div>

              <ul className="flex flex-row">
                {restAttendees &&
                  restAttendees.slice(0, 2).map(({ userPicture }, index) => (
                    <li
                      key={`attendee-rest-${index}`}
                      className="mr-[-50px] z-0"
                    >
                      <Image
                        alt={`photo of user name`}
                        src={
                          !userPicture
                            ? '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg'
                            : userPicture
                        }
                        loading="lazy"
                        width={72}
                        height={72}
                        className="object-cover h-[72px] w-[72px] border-2 border-white rounded-full brightness-75"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <span className="text-red-500 font-semibold text-center pt-3 text-sm">
              {attendees?.length && `+ ${attendees?.length - 3}`} more
            </span>
          </div>
        </a>
      )}
    </>
  )
}
