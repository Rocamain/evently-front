import Image from 'next/image'

import React from 'react'
interface EventPhotoProps {
  eventId: string
  photos: string[]
}

export const EventPhotos: React.FC<EventPhotoProps> = ({ eventId, photos }) => {
  return (
    <div
      id="attendees"
      className="md:max-w-screen w-full pt-10 px-5 sm:px-10 md:px-20 lg:px-0"
    >
      <div className="flex justify-between items-center mb-5 mx-4">
        <h2 className="font-semibold text-xl">Photos ({photos.length})</h2>
        <a
          id="attendees-link"
          href={`/event/${eventId}/photos/`}
          className="text-red-500 font-semibold"
        >
          See all
        </a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4 lg:grid-flow-row lg:grid-cols-3 overflow-auto lg:overflow-hidden">
          {photos.map((photoUrl, index) => (
            <Image
              className="rounded-md min-w-[200px] md: min-w-auto"
              width={300}
              height={260}
              key={index}
              src={photoUrl}
              alt="Photo of the event"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
