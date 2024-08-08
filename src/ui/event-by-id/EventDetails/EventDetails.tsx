import { EventDescription } from './EventDescription/EventDescription'
import { EventMainPicture } from './EventPicture/EventPicture'
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
    <div className="relative mb-10">
      <EventMainPicture eventPicture={eventPhotos} />
      <EventDescription eventDescription={eventDescription} />
    </div>
  )
}
