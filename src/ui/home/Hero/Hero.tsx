import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="mb-16">
      <div className="pt-5 flex flex-col items-center sm:flex-row">
        <div className="flex flex-col w-full lg:w-1/2 space-y-6 sm:mr-5 lg:mr-10 mb-12 sm:mb-0">
          <h1 className="text-3xl sm:text-5xl font-bold">
            The people platform—Where interests become friendships
          </h1>
          <p className="mt-5">
            Evently project is build with React/Next 14, Tailwinds, Google
            places and it allows you to create events and book events. The back
            is build with the Serverless Framework with AWS.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <LinkButton href="/join">Join Evently</LinkButton>
            <LinkButton
              target="_blank"
              href="https://portfolio-javi-roca-git-main-rocamain.vercel.app/"
            >
              Check my portfolio
            </LinkButton>
          </div>
        </div>
        <div>
          <Image
            src="/images/Group.svg"
            alt="People doing networking"
            width={500}
            height={280}
            priority={true}
          />
        </div>
      </div>
    </div>
  )
}
