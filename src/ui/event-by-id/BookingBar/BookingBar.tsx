import { LinkButtonProps } from '@/types/components/Buttons'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import { headers } from 'next/headers'
import React from 'react'
interface BookingBarProps {
  children?: React.ReactNode
  eventLocation: string
  time: string
  price: number
}

const getPath = () => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') as string
  return pathname
}

export const BookingBar: React.FC<BookingBarProps> = ({
  eventLocation,
  time,
  price,
}) => {
  const path = getPath()
  return (
    <div className="sticky bottom-0 w-full py-5 bg-gray-200/90 z-10">
      <div className="flex justify-between  hover:bg-gray-200 text-gray-500 mx-4">
        <div className="hidden sm:flex flex-col justify-center">
          <div>
            <div className="flex flex-col uppercase leading-5 tracking-tight ">
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
                <div className="font-semibold text-red-400">
                  <span>{price === 1 ? 'Free' : `£${price}.00`}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-5 ml-5">
              <div className="flex items-center">
                <LinkButton href="/" color="teal" size="small">
                  Book
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
