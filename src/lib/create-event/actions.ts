'use server'
import { encodeGeohash } from '../utils'
import { processFiles } from './utils'
import { EventLocation } from '@/types/event/event'
import { CreateEventSchema } from './schemas'
import { CreateEventState, Event } from '@/types/event/event'
import { decryptSessionCookie, verifySession } from '../auth/session'
import { redirect } from 'next/navigation'

const { DB_URL } = process.env

const setFormDataFromEventLocation = (
  eventLocationData: string,
  formData: FormData,
) => {
  try {
    const parsedEventLocationData = JSON.parse(
      eventLocationData,
    ) as EventLocation
    Object.entries(parsedEventLocationData).forEach(([key, value]) => {
      formData.set(key, value)
    })
    formData.delete('eventLocation')
  } catch (error) {
    return {
      errors: {
        eventLocation: 'Invalid event location',
        message: 'Event creation unsuccessful',
      },
    }
  }
}

// Main function to handle event creation
export async function CreateEventAction(
  state: CreateEventState,
  formData: FormData,
): Promise<CreateEventState> {
  // Ensure the return type is CreateEventState

  // Verify session
  if (!(await verifySession())) {
    return redirect('/signin')
  }

  // Extract form data
  const eventTitle = formData.get('eventTitle') as string
  const eventLink = formData.get('eventLink') as string
  const eventLocation = formData.get('eventLocation') as string
  const eventCategory = formData.get('eventCategory') as string
  const eventPrice = parseFloat((formData.get('eventPrice') as string).trim())
  const eventTime = formData.get('eventTime') as string
  const eventDate = formData.get('eventDate') as string
  const eventDescription = formData.get('eventDescription') as string
  const files = formData
    .getAll('eventPictures')
    .filter((item) => item instanceof File) as File[]

  formData.set('type', 'event')
  // Get and set geohash
  setFormDataFromEventLocation(eventLocation, formData)
  const eventLocationLng = parseFloat(
    formData.get('eventLocationLng') as string,
  )
  const eventLocationLat = parseFloat(
    formData.get('eventLocationLat') as string,
  )

  formData.set(
    'eventGeoHash',
    encodeGeohash({ eventLocationLng, eventLocationLat }),
  )

  // Prepare data for validation
  const data = {
    eventTitle,
    eventLink,
    eventLocationId: formData.get('eventLocationId'),
    eventLocationAddress: formData.get('eventLocationAddress'),
    eventGeoHash: formData.get('eventGeoHash'),
    eventCategory,
    eventLocationLng,
    eventLocationLat,
    eventPrice,
    eventTime: `${eventTime}:00`, // Ensuring time format is HH:mm:ss
    eventDate,
    eventDescription,
    files,
  }

  // Validate fields
  const validatedFields = CreateEventSchema.safeParse(data)
  if (!validatedFields.success) {
    if (files.length === 1 && files[0].name === 'undefined') {
      return {
        errors: {
          eventPictures: ['Add a valid image'],
          ...validatedFields.error.flatten().fieldErrors,
        },
      }
    }

    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  if (files.length === 1 && files[0].name === 'undefined') {
    return {
      errors: { eventPictures: ['Add a valid image'] },
    }
  }

  try {
    const session = await decryptSessionCookie()
    const response = await fetch(`${DB_URL}/getuser`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.accessToken}` },
    })

    if (response.status !== 200) {
      return redirect('/signin')
    }

    const user = await response.json()
    const eventOwnerData = {
      eventOwnerId: user.Username as string,
      eventOwnerName:
        `${user.UserAttributes[2].Value} ${user.UserAttributes[3].Value}` as string,
      eventOwnerEmail: user.UserAttributes[0].Value as string,
      eventOwnerPicture: user.UserAttributes[4].Value as string,
    }

    Object.entries(eventOwnerData).forEach(([key, value]) =>
      formData.set(key, value),
    )

    // Process images

    const eventPictures = await processFiles(files, {
      main: [500, 400],
      secondary: [400, 340],
    })

    formData.delete('eventPictures')
    eventPictures.forEach((file) => formData.append('eventPictures', file))

    const res = await fetch(`${DB_URL}/item`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: formData,
    })

    const parsedBody: Event = await res.json()

    if (parsedBody?.error) {
      return parsedBody.error
    }

    return { message: 'Event created', eventId: parsedBody.data.eventId }
  } catch (error) {
    return {
      errors: {
        serverError: 'Event creation unsuccessful, something went wrong',
      },
    }
  }
}
