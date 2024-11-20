import Image from 'next/image'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
interface INSTRUCTIONS_CARDS {
  title: string
  link: string
  text: string
  icon: string
}

function CardInstructions(props: INSTRUCTIONS_CARDS) {
  const { title, text, icon, link } = props
  return (
    <div className="flex flex-col sm:w-1/3 items-center space-y-2 md:px-6">
      <Image src={icon} alt="icon" width={150} height={160} />
      <div className="text-center">
        <div className="mb-3">
          <LinkButton href={link}>{title}</LinkButton>
        </div>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  )
}

export default CardInstructions
