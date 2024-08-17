import Image from 'next/image'

interface EventMainPictureProps {
  eventPicture: string[]
}

const PLACEHOLDER = '/images/austin-distel-rxpThOwuVgE-unsplash.jpg'

export const EventMainPicture: React.FC<EventMainPictureProps> = ({
  eventPicture,
}) => {
  const photoUrls = eventPicture.length > 0 ? eventPicture : [PLACEHOLDER]

  return (
    <div className="w-full pb-6 sm:px-10 md:px-20 lg:p-0">
      <div className="relative h-[450px] rounded-lg border border-gray-300">
        <Image
          alt="Event picture"
          src={photoUrls[0]}
          fill
          className="object-cover hover:filter hover:brightness-110 rounded-lg border border-gray-300"
          sizes="(max-width: 640px) 100vw, (min-width: 1024px) 1024px, 100vw"
        />
      </div>
    </div>
  )
}
