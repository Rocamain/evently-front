'use server'
import { cookies } from 'next/headers'

export async function fetchGeo() {
  const cookiesList = cookies()
  const city = cookiesList.get('X-City')?.value || 'Brighouse, UK'
  const latitude = cookiesList.get('X-Latitude')?.value || '53.7012'
  const longitude = cookiesList.get('X-Longitude')?.value || '-1.789'

  return { city, latitude, longitude }
}

export async function setGeo({
  city,
  latitude,
  longitude,
}: {
  city: string
  latitude: string
  longitude: string
}) {
  const cookiesList = cookies()
  cookiesList.set('X-City', city)
  cookiesList.set('X-Latitude', latitude)
  cookiesList.set('X-Longitude', longitude)
}
