/* eslint-disable camelcase */
'use client'
import React, { useState, useCallback } from 'react'
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
      event.preventDefault()
      if (!isPlacePredictionsLoading) {
        setShow(false)
        setInputValue(description)
        setPlaceInfo(placeId)
      }
    },
    [isPlacePredictionsLoading, placesService],
  )

  const setPlaceInfo = (placeId: string) => {
    console.log('PlaceGetInfo')
    placesService?.getDetails(
      {
        placeId,
        fields: [
          'geometry.location',

          'address_components',
          'name',
          'formatted_address',
        ],
      },
      (placeDetails) => {
        console.log('runnnig callback')
        if (
          placeDetails?.geometry?.location?.lat &&
          placeDetails?.address_components &&
          placeDetails?.name
        ) {
          const eventLocationLat = placeDetails.geometry.location.lat()
          const eventLocationLng = placeDetails.geometry.location.lng()
          const eventLocationAddress = placeDetails.formatted_address

          setPlaceSelected({
            eventLocationId: placeId,
            eventLocationAddress,
            eventLocationLat,
            eventLocationLng,
          })
        }
      },
    )
  }
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
  }
}
