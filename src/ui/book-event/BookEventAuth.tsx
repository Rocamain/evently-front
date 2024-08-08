import Image from 'next/image'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

export default function BookEventAuth() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/images/Logo.png"
            alt="Evently logo"
            width={150}
            height={70}
            priority={true}
          />
        </div>
        <div className="pb-6">
          <h1 className="text-xl font-semibold">
            To book this event you need to register or login into your account.
          </h1>
        </div>

        <div className="flex gap-5">
          <LinkButton prefetch={true} href={'/signin'}>
            Login
          </LinkButton>
          <LinkButton prefetch={true} href={'/register'}>
            Register
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
