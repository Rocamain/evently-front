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
  formData.set('type', 'event')
  const eventTitle = formData.get('eventTitle') as string
  const eventLink = formData.get('eventLink') as string
  const eventLocationId = formData.get('eventLocation') as string
  const eventCategory = formData.get('eventCategory') as string
  const eventPrice = parseFloat((formData.get('eventPrice') as string).trim())
  const eventTime = formData.get('eventTime') as string
  const eventDate = formData.get('eventDate') as string
  const eventDescription = formData.get('eventDescription') as string
  const files = formData.getAll('eventPictures')

  const data = {
    eventTitle,
    eventLink,
    eventLocation: eventLocationId,
    eventCategory,
    eventPrice,
    eventTime: `${eventTime}:00`, // Ensuring time format is HH:mm:ss
    eventDate,
    eventDescription,
    eventPictures: files,
  }

  try {
    const validatedFields = CreateEventSchema.safeParse(data)

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: undefined,
      }
    }

    const session = await decryptSessionCookie()

    const getUserResponse = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (getUserResponse.status !== 200) {
      redirect('/signin')
    }
    const user = await getUserResponse.json()

    const eventOwnerData = {
      eventOwnerId: user.Username as string,
      eventOwnerName:
        `${user.UserAttributes[2].Value} ${user.UserAttributes[3].Value}` as string,
      eventOwnerEmail: user.UserAttributes[4].Value as string,
      eventOwnerPicture: user.UserAttributes[5].Value as string,
    }

    Object.entries(eventOwnerData).forEach(([key, value]) => {
      formData.set(key, value)
    })

    const files = formData.getAll('eventPictures')

    files.forEach((file, index) => {
      const fileData = file as File
      formData.append('eventPhotos', file as Blob, fileData.name)
    })
    formData.delete('eventPictures')

    const createEventResponse = await fetch(`http://localhost:4000/item`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    })

    const event = await createEventResponse.json()

    console.log({ event })
    return { errors: undefined, message: 'Event created' }
  } catch (error) {
    return { errors: undefined, message: 'Event creation Unsuccessful' }
  }
}
