/* eslint-disable camelcase */
'use client'
import { usePlacesAutoComplete } from '@/app/hooks/usePlacesAutocomplete'
type PlacesAutoCompleteInputProps = { place: string }

export default function PlacesAutoCompleteInput({
  place,
}: PlacesAutoCompleteInputProps) {
  const {
    placeSelected,
    show,
    inputValue,
    placePredictions,
    handleClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  } = usePlacesAutoComplete(place)

  const inputClassName =
    'outline-none appearance-none text-md text-gray-600 p-3 pl-4 rounded-bl-lg sm:rounded-none border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 flex-grow w-full rounded-r-none placeholder:text-gray-500'
  return (
    <div className="relative flex-grow sm:w-1/2 outline-none">
      <div className="sticky top-0 flex items-center outline-none">
        <label htmlFor="eventLocationSeachBox" className="sr-only">
          Events location
        </label>
        <input
          id="eventLocationSeachBox"
          name="eventLocationSeachBox"
          type="text"
          autoComplete="off"
          placeholder={placeSelected?.eventLocationAddress || place + ', UK'}
          className={inputClassName}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValue}
        />
        {placeSelected! !== null && (
          <input
            name="eventLocation"
            type="text"
            className="hidden"
            defaultValue={JSON.stringify(placeSelected)}
          />
        )}
      </div>
      {show && (
        <ul className="flex flex-col absolute rounded-b-lg border z-20 border-gray-300 bg-white w-full">
          {placePredictions.map(({ description, place_id }) => (
            <li className="px-4 border border-gray-100" key={place_id}>
              <button
                className="relative z-40 w-full text-left py-3 text-gray-500"
                onClick={(e) => handleClick(e, place_id, description)}
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
