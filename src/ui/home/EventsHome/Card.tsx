import Image from 'next/image'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

interface PhotoProps {
  src: string
  alt: string
}

interface LinkProps {
  title: string
  href: string
}

interface EventCardProps {
  photo: PhotoProps
  link: LinkProps
}

export default function Card(props: EventCardProps) {
  const { photo, link } = props

  return (
    <div className="flex items-start order-none">
      <div className="w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={300}
          height={300}
          className="w-full rounded-lg object-cover max-h-[9rem]  sm:aspect-video md:max-h-[12rem]"
        />
        <div className="my-5 flex items-center">
          <LinkButton href={link.href}>{link.title}</LinkButton>
          <Image
            src="images/right-arrow.svg"
            alt="arrow icon"
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  )
}
