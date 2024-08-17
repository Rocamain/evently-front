import { Attendee } from '@/types/event/event'
import Image from 'next/image'

export default function EventRestOfAttendeesCard({
  restOfAttendees,
}: {
  restOfAttendees: Attendee[]
}) {
  const totalRestOfAttendees = restOfAttendees.length
  const totalShowPhotos = restOfAttendees.slice(0, 3)

  return (
    <div className=" bg-white rounded-md py-5 px-2  shadow-[0px_0px_5px_0px_rgba(0,0,0,0.12)] h-[182px] max-w[120px] min-w-[105px]">
      <div className="flex items-start justify-center relative">
        {totalShowPhotos.map(({ userPicture, userName }, index) => {
          const isLast = index + 1 === totalShowPhotos.length

          const a = 100
          return (
            <div
              key={index}
              className={`rekative z-0 ${isLast ? '' : 'mr-[-50px]'}`}
            >
              <Image
                alt={`photo of user ${userName}`}
                width={72}
                height={72}
                src={
                  userPicture
                    ? userPicture
                    : '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg'
                }
                loading="eager"
                className="rounded-full border-2 border-gray-300 object-cover min-h-[72px] min-w-[72px]"
              />
              {isLast && (
                <div className="absolute left-[50%] bottom-[35%] z-10 text-xl font-bold text-white">
                  {`+${totalRestOfAttendees}`}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <h3 className="whitespace-pre-wrap text-teal-600 text-center font-semibold text-sm mt-3 line-clamp-2">
        {`+${totalRestOfAttendees} more`}
      </h3>
    </div>
  )
}
