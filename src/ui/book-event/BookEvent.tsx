'use client'
import { useFormState } from 'react-dom'
import Image from 'next/image'
import { bookEventAction } from '@/lib/book-event/actions'
import SubmitButton from '../buttons/SubmitButton/SubmitButton'
export default function BookEvent({ eventId }: { eventId: string }) {
  const [state, dispatch] = useFormState(bookEventAction, undefined)
  console.log(state)
  return (
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
      <form action={dispatch}>
        <div className="p-6 h-[400px] w-[400px]">
          Press Book now button to confirm your booking
          <label htmlFor="eventId" className="sr-only"></label>
          <input
            type="text"
            className="hidden"
            name="eventId"
            defaultValue={eventId}
          />
          <SubmitButton>Book now</SubmitButton>
        </div>
      </form>
    </div>
  )
}
