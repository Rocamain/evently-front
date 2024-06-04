'use client'
import { useFormStatus } from 'react-dom'

import React from 'react'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="px-4 py-2 rounded bg-teal-500 font-semibold text-white hover:bg-teal-600"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      Submit
    </button>
  )
}
