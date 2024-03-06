/* eslint-disable camelcase */
'use client'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useState, useEffect, MouseEvent, useRef } from 'react'
import { boolean } from 'zod'

interface AutoCompletePlacesProps {
  isSmallScreen?: boolean
}

interface AddressInfo {
  info: string
  types: string[]
}

// interface Plac {
//   name: string
//   address: AddressInfo[]
//   lat: number
//   lng: number
// }
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
  const [inputValue, setValue] = useState('')
  const [place, setPlace] = useState<Place>({ id: '' })
  const [placeID, setPlaceID] = useState('')
  const [show, setShow] = useState(false)

  const {
    placePredictions,
    getPlacePredictions,
    placesService,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.GOOGLE_API_KEY as string,
    options: {
      input: inputValue,
      componentRestrictions: { country: 'gb' },
    },
    debounce: 350,
    language: 'en-gb',
  })

  const inputClassName =
    'outline-none appearance-none text-md text-gray-600 p-3 pl-4 border border-gray-400 hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 flex-grow w-full rounded-r-none placeholder:text-gray-500 ' +
    // (isSmallScreen
    //   ? ` ${placePredictions.length ? 'rounded-none' : 'rounded-bl-lg'}`
    //   : 'rounded-l-none')

    useEffect(() => {
      // fetch place details for the first element in placePredictions array

      if (placeID.length) {
        placesService?.getDetails(
          {
            placeId: placeID,
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

              setPlace({
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
    }, [placeID, placesService])

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    { placeId, description }: { placeId: string; description: string },
  ) => {
    if (placeID !== placeId) {
      setPlaceID(placeId)
      setValue(description)
    }
    setShow(false)
  }

  return (
    <div className="relative flex-grow w-1/2 outline-none">
      <div className="sticky top-0 flex items-center outline-none">
        <input
          name="autocompleteText"
          type="text"
          autoComplete="off"
          placeholder="City, postcode ..."
          className={inputClassName}
          onChange={(event) => {
            event.preventDefault()
            getPlacePredictions({ input: event.target.value })
            setValue(event.target.value)
          }}
          onFocus={() => {
            setShow(true)
          }}
          onBlur={(e) => {
            console.log(e.relatedTarget)
            if (!e.relatedTarget) setShow(false)
          }}
          value={inputValue}
        />
      </div>
      {show && (
        <ul className="flex flex-col absolute rounded-b-lg border z-20 border-gray-300 bg-white w-full">
          {placePredictions.map(({ description, place_id }) => (
            <li className="px-4 border border-gray-100" key={place_id}>
              <button
                className="relative z-40 w-full text-left py-3 text-gray-500"
                onClick={(e) => {
                  console.log('clicked', place_id)
                  handleClick(e, { placeId: place_id, description })
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
