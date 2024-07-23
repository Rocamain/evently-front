import { EventDescription } from './EventDescription/EventDescription'
import EventPicture from './EventPicture/EventPicture'
interface EventDetailsProps {
  eventDescription: string
  eventPhotos: string[]
  isOwner: boolean
}

export const EventDetails = ({
  eventDescription,
  eventPhotos,
  isOwner,
}: EventDetailsProps) => {
  return (
    <div className="relative">
      <EventPicture eventPicture={eventPhotos} isOwner={isOwner} />
      <EventDescription eventDescription={eventDescription} isOwner={isOwner} />
    </div>
  )
}
