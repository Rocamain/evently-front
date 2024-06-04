'use server'
import { EventLocation } from '@/types/event/event'
import { CreateEventSchema } from './schemas'
import { ValidationErrors } from '@/types/event/event'
import { CreateEventState } from '@/types/event/event'
const { DB_URL } = process.env

export async function CreateEventAction(
  state: CreateEventState,
  formData: FormData,
) {
  const EventTitle = formData.get('EventTitle')
  const EventLink = formData.get('EventLink')
  let EventLocation = formData.get('EventLocation')
  const EventCategory = formData.get('EventCategory')
  const EventPrice = formData.get('EventPrice')
  const EventTime = formData.get('EventTime')
  const EventDate = formData.get('EventDate')

  const pasedEventLocation = EventLocation
    ? (JSON.parse(EventLocation as string) as EventLocation)
    : ''

  try {
    const validatedFields = CreateEventSchema.safeParse({
      EventTitle,
      EventLink,
      EventLocation: pasedEventLocation,
      EventCategory,
      EventPrice,
      EventTime: EventTime + ':00',
      EventDate: new Date(EventDate as string),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: undefined,
      }
    }

    return { errors: undefined, message: 'Event created' }
  } catch (e) {
    //  possible implementation to Error page.
    return { errors: undefined, message: 'Event creation Unsuccessful' }
  }
}
