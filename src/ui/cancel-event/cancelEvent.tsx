'use client'
import { useFormState } from 'react-dom'
import { cancelEventAction } from '@/lib/book-event/actions'
import SubmitButton from '../buttons/SubmitButton/SubmitButton'

export default function CancelEvent({ eventId }: { eventId: string }) {
  const [state, dispatch] = useFormState(cancelEventAction, undefined)

  return (
    <form action={dispatch}>
      <div className="mb-6">
        <h6>Are you sure that you want to cancel your event ?</h6>
        <label htmlFor="eventId" className="sr-only">
          <input
            type="text"
            className="hidden"
            name="eventId"
            defaultValue={eventId}
          />
        </label>
      </div>

      {state?.message === 'Event canceled' ? (
        <p className="">{state.message} </p>
      ) : (
        <SubmitButton>Cancel now</SubmitButton>
      )}
      {state?.error && <p className="">{state.message} </p>}
    </form>
  )
}
