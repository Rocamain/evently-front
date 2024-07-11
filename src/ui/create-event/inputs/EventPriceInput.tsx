'use client'
import React, { useCallback } from 'react'
const allowedKeys = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
  'Delete',
]
export default function eventPriceInput({ error }: { error?: string[] }) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, currentTarget } = event

      if (!allowedKeys.includes(key)) {
        event.preventDefault()
      }

      if (key === '.' && currentTarget.value.includes('.')) {
        event.preventDefault()
      }
    },
    [],
  )

  return (
    <div>
      <label htmlFor="price" className="font-bold">
        Price
        {error && (
          <span className="text-red-500 cursor-pointer" title={'Set a Price'}>
            *
          </span>
        )}
      </label>
      <div className="relative mt-4">
        <input
          type="number"
          name="eventPrice"
          id="price"
          className="block w-[90px] bg-gray-100 border rounded-md py-1.5 pl-2.5 pr-2 font-medium placeholder:text-gray-500"
          placeholder="0.00"
          aria-describedby="price-currency"
          onKeyDown={handleKeyDown}
          step="0.01"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-900" id="price-currency">
            £
          </span>
        </div>
      </div>
    </div>
  )
}
