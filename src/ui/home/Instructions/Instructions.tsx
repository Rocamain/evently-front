import CardInstructions from './CardInstructions'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

const INSTRUCTIONS = {
  header: {
    title: 'How it works Evently',
    text: 'Meet new people who share your interests through online and in-person events. It’s free to create an account.',
  },
  cards: [
    {
      icon: '/public/images/instructions/handsUp.svg',
      title: 'Find an event',
      link: '#',
      text: 'Find the event according our interests and your location, you will find what your are looking for!',
    },
    {
      icon: '/images/instructions/ticket.svg',
      title: 'Book an event',
      link: '#',
      text: 'There are thousands of events, and with just two click you will be able to join and discover amazing people',
    },
    {
      icon: '/images/instructions/joinGroup.svg',
      title: 'Create it',
      link: '#',
      text: 'You can also create your own event and create a community with your interests',
    },
  ],
}

export default function Instructions() {
  return (
    <section className=" md:h-auto w-full py-8 lg:mx-0 md: overflow-x-auto  md:w-auto">
      <div className="text-center  relative z-10 p-20 pb-10">
        <h2 className="text-left sm:text-center text-2xl sm:text-3xl font-semibold mb-2">
          {INSTRUCTIONS.header.title}
        </h2>
        <p className="text-left sm:text-center w-full sm:w-2/3 lg:w-1/2 mb-4 mx-auto">
          {INSTRUCTIONS.header.text}
        </p>
      </div>
      <div className="flex flex-wrap  justify-center gap-x-2 gap-y-3 md:flex-nowrap sm:px-2 md:px-4 mb-10">
        {INSTRUCTIONS.cards.map((card) => (
          <CardInstructions key={card.title} {...card} />
        ))}
      </div>
      <div className="flex justify-center">
        <LinkButton href="#">Join us</LinkButton>
      </div>
    </section>
  )
}
