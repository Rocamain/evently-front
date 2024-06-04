/* eslint-disable camelcase */
'use client'
import { useState, useCallback } from 'react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { EventLocation } from '@/types/event/event'

export const usePlacesAutoComplete = () => {
  const [placeSelected, setPlaceSelected] = useState<EventLocation | null>(null)
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

  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
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

  return {
    placeSelected,
    show,
    inputValue,
    placePredictions,
    handleClick,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
  }
}
