'use client'
import { useState } from 'react'
import { usePlacesAutoComplete } from '@/app/hooks/usePlacesAutocomplete'
import Button from '@/ui/buttons/Button/Button'

export default function EventLocationInput({ error }: { error?: string[] }) {
  const [isOnline, setIsOnline] = useState<boolean>(true)
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
  return (
    <div className="relative ml-6 mb-6">
      <div>
        <label htmlFor="eventLocation" className="font-bold text-medium">
          Event location
          {error && (
            <span
              className="text-red-500 cursor-pointer"
              title={'Invalid location'}
            >
              *
            </span>
          )}
        </label>
        <div>
          <h5 className="mt-6">is the Event Online?</h5>
          <div className="flex gap-6 mt-4 mb-6">
            <Button
              size="small"
              variant="contained"
              clickHandler={(e) => {
                e.preventDefault()
                setIsOnline(true)
              }}
            >
              Yes
            </Button>
            <Button
              size="small"
              color="red"
              variant="contained"
              clickHandler={(e) => {
                e.preventDefault()
                setIsOnline(false)
              }}
            >
              No
            </Button>
          </div>
        </div>
        {!isOnline && (
          <input
            name="type"
            id="type"
            type="text"
            className="sr-only"
            defaultValue="event"
          />
        )}
        {isOnline && (
          <input
            name="type"
            id="type"
            type="text"
            className="sr-only"
            defaultValue="event-online"
          />
        )}
        {!isOnline && (
          <>
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
              id="eventLocation"
              type="text"
              className="sr-only"
              defaultValue={placeSelected ? JSON.stringify(placeSelected) : ''}
            />
          </>
        )}
      </div>
      {show && !isOnline && (
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
