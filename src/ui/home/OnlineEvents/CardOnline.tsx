import Link from 'next/link'
import Image from 'next/image'

type DateTime = string[]
type User =
  | {
      name: string
      link: string
    }
  | {}

interface OnlineCardProps {
  dateTime: DateTime
  link: string
  title: string
  photo: string
  users: Array<User>
}
const MONTHS: Array<string> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function CardOnline(props: OnlineCardProps) {
  const { dateTime, title, photo, link = '#' } = props
  const [day, month, year] = dateTime[0].split('/')
  const time = dateTime[1]

  return (
    <Link href={link} className="grow-0 shrink-0 w-auto flex h-full flex-col">
      <div className="relative mb-3">
        <Image src={photo} alt="event image" width={250} height={150} />

        <div className="absolute top-2 left-2">
          Icon <span>Online</span>
        </div>
      </div>

      <div>
        <h4 className="text-base uppercase text-yellow-600 line-clamp-1">{`${day} ${
          MONTHS[Number(month)]
        } ${year} ${time}`}</h4>
        <h4 className="font-lg text-gray-500 line-clamp-3">{title}</h4>
      </div>
    </Link>
  )
}
