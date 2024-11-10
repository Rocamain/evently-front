'use client'
import { PencilIcon } from '@heroicons/react/24/outline'
import { MouseEvent, TouchEvent } from 'react'

export default function EditLocationButton({
  children,
}: {
  children: React.ReactNode
}) {
  const focusInput = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  ) => {
    const inputElement = document.querySelector<HTMLInputElement>(
      '#eventLocationSeachBox',
    )

    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <button
      type="button"
      className="inline text-lg sm:text-2xl text-red-400 hover:text-red-600 group"
      onClick={focusInput}
      onTouchStart={focusInput} // Try to handle both touch and click
    >
      <span className="inline mr-1 group-hover:text-teal-600">_{children}</span>
      <PencilIcon className="inline h-5 w-5 text-red-500 group-hover:text-teal-600" />
    </button>
  )
}
