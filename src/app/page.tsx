import Hero from '@/ui/home/Hero/Hero'
import EventsHome from '@/ui/home/EventsHome/EventsHome'

export default function HomePAge() {
  return (
    <div className="flex flex-col items-center relative">
      <div className="px-4 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full">
        <Hero />
        <EventsHome />
      </div>
    </div>
  )
}
