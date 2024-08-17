import { getUserData, getEventData } from '@/lib/event-by-id/actions'
import { Attendee, Booking, Evento } from '@/types/event/event'
import {
  BookingBar,
  EventHeader,
  EventTitle,
  EventContent,
  EventDetails,
  EventInfo,
  EventPhotos,
  EventAttendees,
} from '@/ui/event-by-id'
import { notFound } from 'next/navigation'

const getUKlocateDate = (dateToConvert: Date): string => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/London',
  } as const

  const stringDate = dateToConvert.toLocaleTimeString('en-GB', options)

  return stringDate
}

export default async function EventPage({
  params: { eventId },
}: {
  params: { eventId: string }
}) {
  const {
    data: { items, count },
  } = await getEventData(eventId)

  if (count === 0) {
    notFound()
  }
  if (count === 0) {
    return <h4>Event Not Found</h4>
  }

  const userInfo = await getUserData()

  const [event, ...bookings] = items
  const attendees = [...bookings] as Attendee[]

  const {
    eventOwnerId,
    eventOwnerName,
    eventTitle,
    eventLink,
    eventDateAndTime,
    eventLocationId,
    eventLocationAddress,
    eventLocationLat,
    eventLocationLng,
    eventPrice,
    eventDescription,
    eventPictures,
    eventOwnerPicture,
  } = event as Evento

  const isEventOwner = userInfo.userId === eventOwnerId
  const bookingAteendee = bookings.filter(
    (attendee) => attendee.userId === userInfo.userId,
  )[0] as Booking

  const time = getUKlocateDate(new Date(eventDateAndTime))

  return (
    <div className="">
      <div className="border-b border-shadowColor">
        <div className="px-5 sm:px-10 md:px-20 mx-auto lg:max-w-5xl xl:max-w-7xl">
          <EventHeader
            eventOwnerName={eventOwnerName}
            eventOwnerPicture={eventOwnerPicture}
          >
            <EventTitle eventTitle={eventTitle} />
          </EventHeader>
        </div>
      </div>
      <div className="lg:bg-gray-200/40">
        <div>
          <div className="lg:px-20 mx-auto lg:max-w-5xl xl:max-w-7xl">
            <EventContent>
              <div className="flex lg:gap-6 flex-col-reverse t-5 lg:pt-10  lg:flex-row lg:justify-between">
                <div className="lg:flex-grow">
                  <EventDetails
                    eventPhotos={eventPictures}
                    eventDescription={eventDescription}
                    isOwner={isEventOwner}
                  />
                  <EventAttendees
                    eventId={eventId}
                    host={{
                      userId: eventOwnerId,
                      userName: eventOwnerName,
                      userPicture: eventOwnerPicture,
                      userEmail: 'email',
                      isHost: true,
                    }}
                    attendees={attendees}
                  />
                </div>
                <EventInfo
                  time={time}
                  eventLink={eventLink}
                  eventLocationAddress={eventLocationAddress}
                  eventLocationLat={eventLocationLat}
                  eventLocationLng={eventLocationLng}
                  eventLocationId={eventLocationId}
                />
              </div>
            </EventContent>
            <EventPhotos eventId={eventId} photos={eventPictures} />
          </div>
        </div>
      </div>

      <BookingBar
        isEventOwner={isEventOwner}
        isAttendee={Boolean(bookingAteendee)}
        bookingAteendee={bookingAteendee}
        eventId={eventId}
        eventLocation={eventTitle}
        time={time}
        price={Number(eventPrice)}
      />
    </div>
  )
}
