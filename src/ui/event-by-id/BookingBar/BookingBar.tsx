import { Booking } from '@/types/event/event'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import React from 'react'
interface BookingBarProps {
  children?: React.ReactNode
  eventLocation: string
  time: string
  price: number
  eventId: string
  isEventOwner: boolean
  isAttendee: boolean
  bookingAteendee: Booking
}

export const BookingBar: React.FC<BookingBarProps> = ({
  eventLocation,
  time,
  price,
  eventId,
  isEventOwner,
  isAttendee,
  bookingAteendee,
}) => {
  return (
    <div
      id="BookingBar"
      className="sticky bottom-0 w-full p-5  md:px-10 bg-gray-200/90 z-10 "
    >
      <div className="flex justify-between lg:px-20 mx-auto lg:max-w-5xl xl:max-w-7xl hover:bg-gray-200 text-gray-500">
        <div className="flex flex-col justify-center">
          <div>
            <div className="flex flex-col uppercase leading-5 tracking-tight">
              <p className="font-semibold">{eventLocation}</p>
            </div>
          </div>
          <div>
            <time className="" dateTime={time} title={time}>
              {time}
            </time>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="flex items-center justify-around">
            <div className="flex items-center md:block">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center font-semibold">
                  <span className="hidden uppercase sm:inline-block">
                    Price:
                  </span>
                  <span className=" text-red-400 ">
                    {price === 1 ? 'Free' : `£${price}.00`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-5 ml-5">
              <div className="flex items-center">
                {isAttendee && !isEventOwner && (
                  <LinkButton
                    href={{
                      pathname: `/booking/${eventId}/cancel`,
                    }}
                    color="red"
                    size="small"
                    scroll={false}
                  >
                    Cancel Booking
                  </LinkButton>
                )}
                {isEventOwner && (
                  <div className="flex gap-4">
                    <LinkButton
                      href={{
                        pathname: `/event/${eventId}/modify`,
                      }}
                      color="teal"
                      size="small"
                      scroll={false}
                    >
                      Modify
                    </LinkButton>
                    <LinkButton
                      href={{
                        pathname: `/event/${eventId}/cancel`,
                      }}
                      color="red"
                      size="small"
                      scroll={false}
                    >
                      Cancel
                    </LinkButton>
                  </div>
                )}
                {!isAttendee && !isEventOwner && (
                  <LinkButton
                    href={{
                      pathname: `/event/${eventId}/book`,
                    }}
                    scroll={false}
                    color="teal"
                    size="small"
                  >
                    Book
                  </LinkButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
