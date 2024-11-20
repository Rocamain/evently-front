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
      <div className="rounded-md overflow-hidden w-full aspect-[16/8]">
        <Image
          className="object-cover object-top w-full h-full"
          src={photo.src}
          alt={photo.alt}
          width={300}
          height={300}
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
