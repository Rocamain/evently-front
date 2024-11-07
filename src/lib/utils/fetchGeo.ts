import { headers } from 'next/headers'

async function fetchGeo() {
  const headersList = headers()
  const city = headersList.get('X-City') || 'Brighouse'
  const latitude = headersList.get('X-Latitude') || '53.7012'
  const longitude = headersList.get('X-Longitude') || '-1.789'
  return { city, latitude, longitude }
}

export default fetchGeo
