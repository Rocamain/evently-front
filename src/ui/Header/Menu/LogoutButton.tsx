import { useFormStatus } from 'react-dom'
import { PowerIcon } from '@heroicons/react/16/solid'

export default function LogoutButton() {
  const { pending, data } = useFormStatus()

  return (
    <button
      className="group w-fit ml-auto flex justify-end align-text-bottom gap-3 font-semibold  text-red-500 hover:text-red-400 tracking-wide disabled:text-red-200"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      Logout
      <div className="w-[26px] h-[26px]">
        <PowerIcon className="text-red-500 group-hover:text-red-400" />
      </div>
    </button>
  )
}
