import Link from 'next/link'
import React from 'react'
import ProfilePicture from '@/ui/ProfilePicture/ProfilePicture'

interface EventHeaderProps {
  children: React.ReactNode
  eventOwnerName: string
  eventOwnerPicture: string
}

export const EventHeader = ({
  children,
  eventOwnerName,
  eventOwnerPicture,
}: EventHeaderProps) => {
  return (
    <div className="py-6">
      {children}
      <Link href="/#" className="flex flex-row items-center mt-2 lg:mt-4">
        <ProfilePicture picture={eventOwnerPicture} />
        <div className="ml-3">
          <p className="xl:text-lg">Hosted by</p>
          <p className="xl:text-xl font-bold">{eventOwnerName}</p>
        </div>
      </Link>
    </div>
  )
}
