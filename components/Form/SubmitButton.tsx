import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="block font-large text-white font-bold bg-red-500 transition-colors hover:bg-red-400 rounded-md px-4 py-2"
      style={{ letterSpacing: '0.06em', marginLeft: '45px' }}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      Submit
    </button>
  )
}
