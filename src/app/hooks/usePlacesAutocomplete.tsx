/* eslint-disable camelcase */
'use client'
import React, { useState, useCallback } from 'react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

export const usePlacesAutoComplete = () => {
  const [placeSelected, setPlaceSelected] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    debounce: 350,
    language: 'en-gb',
  })

  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      placeId: string,
      description: string,
    ) => {
      event.preventDefault()
      if (!isPlacePredictionsLoading) {
        setShow(false)
        setPlaceSelected(placeId)
        setInputValue(description)
      }
    },
    [isPlacePredictionsLoading, placesService],
  )
  const getPlaceDetails = (placeId: string, setState: () => void) =>
    placesService?.getDetails(
      {
        placeId,
        fields: ['geometry.location', 'place_id', 'address_components', 'name'],
      },
      // Callback example
      (placeDetails) => {
        if (
          placeDetails?.geometry?.location?.lat &&
          placeDetails?.place_id &&
          placeDetails?.address_components &&
          placeDetails?.name
        ) {
          const lat = placeDetails.geometry.location.lat()
          const lng = placeDetails.geometry.location.lng()
          const address = placeDetails.address_components
          // set your state.
        }
      },
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

  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (inputValue) {
        setInputValue('')
      }
    },
    [inputValue],
  )

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (!event.relatedTarget) setShow(false)
      if (event.relatedTarget?.id === 'SearchByWordsInput') {
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
    getPlaceDetails,
  }
}
