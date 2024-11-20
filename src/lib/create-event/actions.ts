'use server'
import { encodeGeohash } from '../utils'
import { processFiles } from './utils'
import {
  EventLocation,
  CreateEventState,
  Event,
  EventData,
} from '@/types/event/event'
import { CreateEventSchema, CreateOnlineEventSchema } from './schemas'
import { decryptSessionCookie, verifySession } from '../auth/session'
import { redirect } from 'next/navigation'

type EventFormData = {
  eventTitle: string
  eventLink: string
  eventCategory: string
  eventPrice: number
  eventTime: string // e.g., formatted as "HH:mm:ss"
  eventDate: string
  eventDescription: string
  files: File[]
} & Partial<{
  eventLocationId: number
  eventLocationLng: number
  eventLocationLat: number
  eventLocationAddress: string
  eventGeoHash: string
}>

const { DB_URL } = process.env

// Helper to set form data with eventOwner information
const setEventOwnerInfo = async (formData: FormData, accessToken: unknown) => {
  const response = await fetch(`${DB_URL}/getuser`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (response.status !== 200) {
    return redirect('/signin')
  }

  const user = await response.json()
  const eventOwnerData = {
    eventOwnerId: user.Username,
    eventOwnerName: `${user.UserAttributes[2].Value} ${user.UserAttributes[3].Value}`,
    eventOwnerEmail: user.UserAttributes[0].Value,
    eventOwnerPicture: user.UserAttributes[4].Value,
  }
  Object.entries(eventOwnerData).forEach(([key, value]) =>
    formData.set(key, value),
  )
}

// Helper to set form data from event location
const setFormDataFromEventLocation = (formData: FormData) => {
  try {
    const eventLocation = formData.get('eventLocation') as string

    if (eventLocation !== 'online') {
      const parsedEventLocationData = JSON.parse(eventLocation) as EventLocation
      Object.entries(parsedEventLocationData).forEach(([key, value]) =>
        formData.set(key, value),
      )
    }

    if (eventLocation === 'online') {
      formData.set('eventLocationId', 'online')
    }

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

// Helper to validate event data and images
const validateEventData = (data: EventData, isEventOnline: boolean) => {
  const schema = isEventOnline ? CreateOnlineEventSchema : CreateEventSchema
  const validation = schema.safeParse(data)
  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors }
  }
  if (
    data.files &&
    data.files.length === 1 &&
    data.files[0].name === 'undefined'
  ) {
    return { errors: { eventPictures: ['Add a valid image'] } }
  }
  return null
}

// Main function to handle event creation
export async function CreateEventAction(
  state: CreateEventState,
  formData: FormData,
): Promise<CreateEventState> {
  // Verify session
  if (!(await verifySession())) {
    return redirect('/signin')
  }

  // Decrypt session and extract access token
  const { accessToken } = await decryptSessionCookie()

  // Set form data for event location and geohash
  const isEventOnline = formData.get('type') === 'event-online'
  setFormDataFromEventLocation(formData)

  // Prepare data for validation
  let data: EventFormData = {
    eventTitle: formData.get('eventTitle') as string,
    eventLink: formData.get('eventLink') as string,
    eventCategory: formData.get('eventCategory') as string,
    eventPrice: parseFloat((formData.get('eventPrice') as string).trim()),
    eventTime: `${formData.get('eventTime')}:00`, // Format as HH:mm:ss
    eventDate: formData.get('eventDate') as string,
    eventDescription: formData.get('eventDescription') as string,
    files: formData
      .getAll('eventPictures')
      .filter((item) => item instanceof File) as File[],
  }

  if (!isEventOnline) {
    const lng = parseFloat(formData.get('eventLocationLng') as string)
    const lat = parseFloat(formData.get('eventLocationLat') as string)
    formData.set(
      'eventGeoHash',
      encodeGeohash({ eventLocationLng: lng, eventLocationLat: lat }),
    )
    data = {
      eventLocationId: parseFloat(formData.get('eventLocationId') as string),
      eventLocationLng: parseFloat(formData.get('eventLocationLng') as string),
      eventLocationLat: parseFloat(formData.get('eventLocationLat') as string),
      eventLocationAddress: formData.get('eventLocationAddress') as string,
      eventGeoHash: formData.get('eventGeoHash') as string,
      ...data,
    }
  }

  // Validate data and files
  const validationErrors = validateEventData(data, isEventOnline)
  if (validationErrors) {
    return validationErrors
  }

  try {
    // Set owner information
    await setEventOwnerInfo(formData, accessToken)

    // Process images and add them to form data
    const processedImages = await processFiles(data.files, {
      main: [500, 400],
      secondary: [400, 340],
    })
    formData.delete('eventPictures')
    processedImages.forEach((file) => formData.append('eventPictures', file))
    // Send event data to the API
    const response = await fetch(`${DB_URL}/item`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    })

    const result: Event = await response.json()
    if (result?.data?.error) {
      return result.data.error
    }

    return { message: 'Event created', eventId: result.data.eventId }
  } catch (error) {
    return {
      errors: {
        serverError: 'Event creation unsuccessful, something went wrong',
      },
    }
  }
}
