// app/page.tsx
import { headers } from 'next/headers'
import Hero from '@/ui/home/Hero/Hero'
import EventsHome from '@/ui/home/EventsHome/EventsHome'
import { Booking, Evento, Events } from '@/types/event/event'

const { DB_URL } = process.env

// import EventsCooking from '@/ui/home/EventsCooking/EventsCooking'
interface EventFetchParams {
  city: string | null
  latitude: string | null
  longitude: string | null
}
const EventsFetcher = async ({
  city,
  latitude,
  longitude,
}: EventFetchParams): Promise<Events> => {
  console.log({ city, latitude, longitude })
  const response = await fetch(
    `${DB_URL}/items/byUser/event?withBookings=true`,
    {
      method: 'GET',
      next: { revalidate: 0 },
    },
  )

  const parsedData: Array<{ items: Array<Evento | Booking>; count: number }> =
    await response.json()

  const isEvent = (item: Evento | Booking): item is Evento => {
    return item.type === 'event'
  }

  const events = parsedData.map(({ items }) => {
    const eventIndex = items.findIndex(isEvent)
    if (eventIndex === -1) {
      throw new Error('No event found in items.')
    }

    const event = items[eventIndex] as Evento

    const bookings = items.filter((item) => item !== event) as Booking[]
    return { event, bookings }
  })

  return events
}

type Location = {
  city: string
  region: string
  latitude: string
  longitude: string
}

// Define an async function to fetch location data
async function getLocationData({
  city,
  longitude,
  latitude,
}: {
  city: string | null
  longitude: number | null
  latitude: number | null
}) {
  const response = await fetch(`https://ipapi.co/${'208.67.222.222'}/json/`)
  const geoData = await response.json()
  console.log({ response, geoData })
  if (!response.ok) {
    throw new Error('Failed to fetch location data')
  }

  return {
    city: geoData.city || 'Unknown',
    region: geoData.region || 'Unknown',
    latitude: geoData.latitude || '0',
    longitude: geoData.longitude || '0',
  }
}

// Server component to fetch data on the server
export default async function HomePage() {
  const headersList = await headers()
  const city = headersList.get('X-City')
  const latitude = headersList.get('X-Latitude')
  const longitude = headersList.get('X-Longitude')

  const events = await EventsFetcher({ city, latitude, longitude })

  console.log(events)
  // Get the IP address
  // const ip = '127.0.0.1' // Placeholder for localhost; consider adjusting for production
  // const location = await getLocationData(ip)
  // console.log(location)
  return (
    <div className="flex flex-col items-center relative">
      <div className="px-4 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full">
        <Hero />
        <EventsHome />
        {/* <EventsCooking /> */}
      </div>
    </div>
  )
}
