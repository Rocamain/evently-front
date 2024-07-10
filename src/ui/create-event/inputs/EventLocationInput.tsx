'use client'

import { usePlacesAutoComplete } from '@/app/hooks/usePlacesAutocomplete'

export default function eventLocationInput({ error }: { error?: string[] }) {
  const {
    placeSelected,
    show,
    inputValue,
    placePredictions,
    handleClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = usePlacesAutoComplete()

  console.log({ placeSelected })
  return (
    <div className="relative ml-6 mb-6">
      <div>
        <label htmlFor="eventLocation" className="font-bold text-medium">
          Event location
          {error && (
            <span className="text-red-500 cursor-pointer" title={error[0]}>
              *
            </span>
          )}
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder="City, postcode ..."
          className="mt-2 w-full p-2 border border-gray-300 font-medium rounded-md"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValue}
        />
        <input
          name="eventLocation"
          type="text"
          className="sr-only"
          defaultValue={placeSelected ? JSON.stringify(placeSelected) : ''}
        />
      </div>
      {show && (
        <ul className="flex flex-col absolute rounded-b-lg border z-20 border-gray-300 bg-white w-full">
          {placePredictions.map(({ description, place_id }) => (
            <li className="px-4 border border-gray-100" key={place_id}>
              <button
                className="relative z-40 w-full text-left py-3 text-gray-500"
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(e, place_id, description)
                }}
              >
                {description}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
