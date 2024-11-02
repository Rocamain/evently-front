// app/page.tsx
import Hero from '@/ui/home/Hero/Hero'
import EventsHome from '@/ui/home/EventsHome/EventsHome'
// import EventsCooking from '@/ui/home/EventsCooking/EventsCooking'

type Location = {
  city: string
  region: string
  latitude: string
  longitude: string
}

// Define an async function to fetch location data
async function getLocationData(ip: string) {
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
  console.log(process.env)
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
