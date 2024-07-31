'use client'
import { useFormState } from 'react-dom'
import { bookEventAction } from '@/lib/book-event/actions'
import SubmitButton from '../buttons/SubmitButton/SubmitButton'
export default function BookEvent({ eventId }: { eventId: string }) {
  const [state, dispatch] = useFormState(bookEventAction, undefined)

  return (
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
  )
}
