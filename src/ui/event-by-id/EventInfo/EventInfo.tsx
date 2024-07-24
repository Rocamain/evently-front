import React from 'react'
import { ClockIcon, HomeIcon, LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import dynamic from 'next/dynamic'

interface EventInfoProps {
  time: string
  eventLink: string
  eventLocationId: string
  eventLocationAddress: string
  eventLocationLat: string
  eventLocationLng: string
}

// Dynamically import the MapComponent with no SSR
const MapComponent = dynamic(() => import('./EventMap'), { ssr: false })

export const EventInfo: React.FC<EventInfoProps> = ({
  time,
  eventLink,
  eventLocationId,
  eventLocationAddress,
  eventLocationLat,
  eventLocationLng,
}) => {
  const lat = parseFloat(eventLocationLat)
  const lng = parseFloat(eventLocationLng)

  return (
    <div className="lg:pb-6 lg:bg-none lg:border lg:border-none rounded-lg lg:w-[400px] lg:border-shadowColor">
      <div className="lg:sticky lg:top-0 w-full lg:h-fit">
        <div className="py-6 px-5 sm:px-10  md:px-20 lg:px-0 bg-gray-200/40 lg:bg-white border-b border-shadowColor lg:border-gray-300 lg:border lg:border-b-0 lg:rounded-t-lg sm:md:max-w-xl md:max-w-5xl">
          <div className="flex flex-col lg:mx-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <ClockIcon className="text-gray-500 w-full h-full" />
              </div>
              <time
                dateTime={time}
                title={time}
                className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {time}
              </time>
            </div>

            <div className="flex items-center mt-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <HomeIcon className="text-gray-500 w-full h-full" />
              </div>
              <address>
                <Link
                  target="_blank"
                  href={eventLink}
                  className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {eventLocationAddress}
                </Link>
              </address>
            </div>

            <div className="group flex items-center mt-2 text-teal-600 font-semibold hover:text-red-400">
              <div className="w-8 h-8 flex items-center justify-center">
                <LinkIcon className="text-gray-500 w-full h-full group-hover:text-red-400" />
              </div>
              <Link
                target="_blank"
                href={eventLink}
                className="ml-2 whitespace-nowrap overflow-hidden"
              >
                Event's link
              </Link>
            </div>
          </div>
        </div>

        <div className="relative pt-6 lg:pb-6 lg:pt-0 bg-white sm:px-10 md:px-20 lg:px-4 lg:border lg:border-gray-300 lg:border-t-0 lg:rounded-b-lg sm:md:max-w-xl md:max-w-5xl">
          <MapComponent lat={lat} lng={lng} />
        </div>
      </div>
    </div>
  )
}
