'use server'
import { encodeGeohash, setFormDataFromEventLocation } from './utils'
import { CreateEventSchema } from './schemas'
import { CreateEventState } from '@/types/event/event'
import { decryptSessionCookie, verifySession } from '../auth/session'
import { redirect } from 'next/navigation'
import sharp from 'sharp'

const { DB_URL } = process.env

// Main function to handle event creation
export async function CreateEventAction(
  state: CreateEventState,
  formData: FormData,
) {
  console.log('Run create action')

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
  setFormDataFromEventLocation(eventLocation, formData)

  // Get and set geohash
  const eventLocationLng = parseFloat(
    (formData.get('eventLocationLng') as string).trim(),
  )
  const eventLocationLat = parseFloat(
    (formData.get('eventLocationLat') as string).trim(),
  )
  formData.set(
    'eventGeoHash',
    encodeGeohash({ eventLocationLng, eventLocationLat }),
  )

  // Prepare data for validation
  const data = {
    eventTitle,
    eventLink,
    eventLocationId: formData.get('eventLocationId') as string,
    eventLocationAddress: formData.get('eventLocationAddress') as string,
    eventGeoHash: formData.get('eventGeoHash') as string,
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
    console.log({ errors: validatedFields.error.flatten().fieldErrors })
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: undefined,
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
    const eventPictures = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer()
        const resizedBuffer = await sharp(Buffer.from(buffer))
          .withMetadata()
          .resize(300, 300, { kernel: sharp.kernel.cubic, fit: 'cover' })
          .webp({ quality: 100 })
          .toBuffer()
        return new File([resizedBuffer], `${file.name.split('.')[0]}.webp`, {
          type: 'image/webp',
        })
      }),
    )

    formData.delete('eventPictures')
    eventPictures.forEach((file) => formData.append('eventPictures', file))

    const res = await fetch(`${DB_URL}/item`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session.accessToken}` },
      body: formData,
    })

    await res.json()

    return { errors: undefined, message: 'Event created' }
  } catch (error) {
    console.error('Event creation failed', error)
    return {
      errors: undefined,
      message: 'Event creation unsuccessful, server down',
    }
  }
}
