'use client'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { cancelBookingAction } from '@/lib/book-event/actions'
import SubmitButton from '../buttons/SubmitButton/SubmitButton'
import Button from '../buttons/Button/Button'

export default function CancelBooking({
  eventId,
  userName,
}: {
  eventId: string
  userName: string
}) {
  const [state, dispatch] = useFormState(cancelBookingAction, undefined)
  const router = useRouter()

  return (
    <form action={dispatch} className="w-[250px] flex flex-col gap-4">
      {state?.message === 'Booking canceled' ? (
        <h2 className="text-lg text-gray-600 font-normal">{`${userName}, your booking it has been cancelled.}`}</h2>
      ) : (
        <>
          <h2 className="text-lg text-gray-600 font-normal">
            Are you sure that you want to cancel your booking?
          </h2>
          <label htmlFor="eventId" className="sr-only">
            <input
              type="text"
              className="hidden"
              name="eventId"
              defaultValue={eventId}
            />
          </label>
        </>
      )}
      {state?.message === 'Booking canceled' ? (
        <Button clickHandler={() => router.back()}> Go back </Button>
      ) : (
        <div>
          <SubmitButton>Cancel now</SubmitButton>
        </div>
      )}
    </form>
  )
}
