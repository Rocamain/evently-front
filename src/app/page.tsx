import Hero from '@/ui/home/Hero/Hero'
import EventsHome from '@/ui/home/EventsHome/EventsHome'
import CloseEvents from '@/ui/home/CloseEvents/CloseEvents'
import OnlineEvents from '@/ui/home/OnlineEvents/OnlineEvents'

export default async function HomePage() {
  return (
    // <div className="flex flex-col items-center pt-8">
    <div>
      <Hero />
      <EventsHome />
      <OnlineEvents />
      <CloseEvents />
    </div>
    // </div>
  )
}
