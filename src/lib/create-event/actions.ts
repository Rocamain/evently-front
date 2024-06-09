'use server'
import { EventLocation } from '@/types/event/event'
import { CreateEventSchema } from './schemas'
import { CreateEventState } from '@/types/event/event'
import { decryptSessionCookie, verifySession } from '../auth/session'
import { redirect } from 'next/navigation'

const { DB_URL } = process.env

export async function CreateEventAction(
  state: CreateEventState,
  formData: FormData,
) {
  const isVerified = await verifySession()

  if (!isVerified) {
    redirect('/signin')
  }

  const eventTitle = formData.get('EventTitle') as string
  const eventLink = formData.get('EventLink') as string
  const eventLocation = formData.get('EventLocation') as string
  const eventCategory = formData.get('EventCategory') as string
  const eventPrice = parseFloat((formData.get('EventPrice') as string).trim())
  const eventTime = formData.get('EventTime') as string
  const eventDate = formData.get('EventDate') as string
  const eventDescription = formData.get('EventDescription') as string
  const files = formData.getAll('eventPictures')

  const parsedEventLocation = eventLocation.length
    ? (JSON.parse(eventLocation) as EventLocation)
    : ''

  const data = {
    eventTitle,
    eventLink,
    eventLocation: parsedEventLocation,
    eventCategory,
    eventPrice,
    eventTime: `${eventTime}:00`, // Ensuring time format is HH:mm:ss
    eventDate: new Date(eventDate),
    eventDescription,
    eventPictures: files,
  }

  try {
    const validatedFields = CreateEventSchema.safeParse(data)

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: undefined,
      }
    }

    const session = await decryptSessionCookie()

    const response = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (response.status !== 200) {
      redirect('/signin')
    }
    const user = await response.json()

    return { errors: undefined, message: 'Event created' }
  } catch (error) {
    return { errors: undefined, message: 'Event creation Unsuccessful' }
  }
}
