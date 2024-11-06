'use client'
import { PencilIcon } from '@heroicons/react/24/outline'

export default function EditLocationButton({
  children,
}: {
  children: React.ReactNode
}) {
  const focusInput = () => {
    const inputElement = document.querySelector<HTMLInputElement>(
      '#eventLocationSeachBox',
    )

    if (inputElement) {
      console.log(inputElement)
      inputElement.focus()
    } else {
      console.log('Input element with ID "eventLocationSeachBox" not found')
    }
  }

  return (
    <button
      type="button"
      className="text-red-500 hover:text-red-600 flex items-center group"
      onClick={focusInput}
      onTouchStart={focusInput}
    >
      <span className="mr-1 group-hover:text-teal-600">_{children}</span>
      <PencilIcon className="h-4 w-4 text-red-500 group-hover:text-teal-600" />
    </button>
  )
}