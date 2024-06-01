/* eslint-disable camelcase */
'use client'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useState, useEffect, MouseEvent, useRef, useCallback } from 'react'

interface AutoCompletePlacesProps {
  isSmallScreen?: boolean
}

interface AddressInfo {
  info: string
  types: string[]
}

interface Place {
  id: string
  name?: string
  address?: AddressInfo[]
  lat?: number
  lng?: number
}

export default function PlacesAutoCompleteInput({
  isSmallScreen = false,
}: AutoCompletePlacesProps) {
  const [placeSelected, setPlaceSelected] = useState<Place | null>(null)
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.GOOGLE_API_KEY,
    debounce: 350,
    language: 'en-gb',
  })

  const inputClassName =
    'outline-none appearance-none text-md text-gray-600 p-3 pl-4 rounded-bl-lg sm:rounded-none border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 flex-grow w-full rounded-r-none placeholder:text-gray-500'

  const handleClick = useCallback(
    (
      event: MouseEvent<HTMLButtonElement>,
      placeId: string,
      description: string,
    ) => {
      if (!isPlacePredictionsLoading) {
        setShow(false)
        setInputValue(description)
        placesService?.getDetails(
          {
            placeId,
            fields: [
              'geometry.location',
              'place_id',
              'address_components',
              'name',
            ],
          },
          (placeDetails) => {
            if (
              placeDetails?.geometry?.location?.lat &&
              placeDetails?.place_id &&
              placeDetails?.address_components &&
              placeDetails?.name
            ) {
              const lat = placeDetails.geometry.location.lat()
              const lng = placeDetails.geometry.location.lng()
              const address = placeDetails.address_components.map(
                ({ short_name, types }) => ({ info: short_name, types }),
              )

              setPlaceSelected({
                id: placeDetails.place_id,
                name: placeDetails.name,
                address,
                lat,
                lng,
              })
            }
          },
        )
      }
    },
    [isPlacePredictionsLoading, placesService],
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setInputValue(event.target.value)
      getPlacePredictions({
        input: event.target.value,
        componentRestrictions: { country: 'gb' },
      })
      setShow(true)
    },
    [getPlacePredictions],
  )

  const handleInputFocus = useCallback(() => {
    if (inputValue) {
      setInputValue('')
    }
  }, [inputValue])

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.relatedTarget) setShow(false)
      if (e.relatedTarget?.id === 'SearchByWordsInput') {
        setShow(false)
      }
    },
    [],
  )

  return (
    <div className="relative flex-grow sm:w-1/2 outline-none">
      <div className="sticky top-0 flex items-center outline-none">
        <input
          name="autocompleteText"
          type="text"
          autoComplete="off"
          placeholder="City, postcode ..."
          className={inputClassName}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={inputValue}
        />
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
