'use server'
import { redirect } from 'next/navigation'
import { setGeo } from '../utils/geo'

export async function searchEventAction(state: unknown, formData: FormData) {
  const eventsLocation = formData.get('eventLocation') as string

  const {
    eventLocationAddress,
    eventLocationLat,
    eventLocationLng,
  }: {
    eventLocationAddress: string
    eventLocationLat: string
    eventLocationLng: string
  } = JSON.parse(eventsLocation)
  await setGeo({
    city: eventLocationAddress,
    latitude: eventLocationLat,
    longitude: eventLocationLng,
  })

  redirect('/dashboard')
}
