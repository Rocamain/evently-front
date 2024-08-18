import Card from './Card'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import Instructions from '../Instructions/Instructions'
import OnlineEvents from '../OnlineEvents/OnlineEvents'

const EVENTS = [
  {
    photo: {
      src: '/images/jed-villejo-bEcC0nyIp2g-unsplash.jpg',
      alt: 'People hiking',
    },
    link: { title: 'Make new friends', href: '#friends' },
  },
  {
    photo: {
      src: '/images/jimmy-dean-my1mDMraGf0-unsplash.jpg',
      alt: 'Couple cooking',
    },
    link: { title: 'Learn new recipes', href: '#cooking' },
  },

  {
    photo: {
      src: '/images/austin-distel-rxpThOwuVgE-unsplash.jpg',
      alt: 'People in a in a tech meeting',
    },
    link: { title: 'Connect over tech', href: '#tech' },
  },
]

const BUTTONS = [
  { title: 'Boost your career', href: '#' },
  { title: 'Cook like chef', href: '#' },
  { title: 'Get fit', href: '#' },
  { title: 'Read with friends', href: '#' },
  { title: 'Language exchange', href: '#' },
  { title: 'Find your zen', href: '#' },
  { title: 'learn JavaScript', href: '#' },
]

export default function Event() {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        {EVENTS.map((event) => (
          <Card key={event.link.title} {...event} />
        ))}
      </section>
      <section className="md:h-auto w-full flex flex-wrap py-8 lg:mx-0 md: overflow-x-auto  md:w-auto">
        <div className="flex flex-wrap gap-x-2 gap-y-3 md:flex-nowrap sm:px-2 md:px-4">
          {BUTTONS.map((button) => (
            <div key={button.title} className="flex items-center">
              <LinkButton href={button.href}>{button.title}</LinkButton>
            </div>
          ))}
        </div>
      </section>
      <Instructions />
      <OnlineEvents />
    </>
  )
}
