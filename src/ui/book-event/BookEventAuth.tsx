import Image from 'next/image'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

export default function BookEventAuth() {
  return (
    <>
      <div className="pb-6">
        <h1 className="text-xl font-semibold">
          To book this event you need to register or login into your account.
        </h1>
      </div>

      <div className="flex gap-5 justify-center">
        <LinkButton prefetch={true} href={'/signin'}>
          Login
        </LinkButton>
        <LinkButton prefetch={true} href={'/register'}>
          Register
        </LinkButton>
      </div>
    </>
  )
}
