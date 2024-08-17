'use client'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import useModal from '@/app/hooks/useModal'
import { bookEventAction } from '@/lib/book-event/actions'
import SubmitButton from '../buttons/SubmitButton/SubmitButton'

export default function BookEvent({
  eventId,
  hasBooking,
}: {
  eventId: string
  hasBooking: boolean
}) {
  const [state, dispatch] = useFormState(bookEventAction, undefined)

  const { onDismiss } = useModal()

  useEffect(() => {
    if (state?.message === 'Booking done') {
      onDismiss()
    }
  }, [state])

  if (hasBooking) {
    return <h3>Event already booked</h3>
  }
  return (
    <form action={dispatch}>
      <h6>Press Book now button to confirm your booking</h6>
      <label htmlFor="eventId" className="sr-only"></label>
      <input
        type="text"
        className="hidden"
        name="eventId"
        defaultValue={eventId}
      />
      <SubmitButton>Book now</SubmitButton>
    </form>
  )
}
