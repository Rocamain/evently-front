import React from 'react'
import Image from 'next/image'
import { Attendee } from '@/types/event/event'

interface AttendeeProps {
  attendee: Attendee
}

export const AttendeeCard: React.FC<AttendeeProps> = ({ attendee }) => {
  const { userId, userName, userPicture, isHost } = attendee
  return (
    <a href={`/user/${userId}`} className="hover:no-underline">
      <div className="flex flex-col bg-white rounded-md py-5 px-2 items-center relative shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[150px] min-w-[125px]">
        {isHost && (
          <div className="bg-amber-400 text-white font-semibold text-xs py-[5px] px-[7px] rounded-md absolute left-2 -top-3">
            Host
          </div>
        )}
        <div>
          <picture>
            <Image
              alt={`photo of user ${userName}`}
              width={72}
              height={72}
              src={
                userPicture.length > 0
                  ? userPicture
                  : '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg'
              }
              loading="eager"
              className="rounded-full object-cover h-[72px] w-[72px]"
            />
          </picture>
        </div>
        <span className="whitespace-pre-wrap text-center font-medium text-sm mt-3 line-clamp-2">
          {userName}
        </span>
        <span className="whitespace-pre-wrap text-xs mt-1 text-gray-600 text-center">
          {isHost ? 'Host' : 'Attendee'}
        </span>
      </div>
    </a>
  )
}
