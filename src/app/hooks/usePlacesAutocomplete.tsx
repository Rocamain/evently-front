/* eslint-disable camelcase */
'use client'
import React, { useState, useCallback, useEffect } from 'react'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { EventLocation } from '@/types/event/event'
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

export const usePlacesAutoComplete = (place?: {
  city: string
  latitude: string
  longitude: string
}) => {
  const [placeSelected, setPlaceSelected] = useState<EventLocation | null>(null)
  const [show, setShow] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey,
    debounce: 350,
    language: 'en-gb',
  })

  const setPlaceInfo = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId,
        fields: ['geometry.location', 'name', 'formatted_address'],
      },
      (placeDetails) => {
        if (
          placeDetails?.geometry?.location?.lat &&
          placeDetails?.formatted_address &&
          placeDetails?.name
        ) {
          const eventLocationLat = placeDetails.geometry.location.lat()
          const eventLocationLng = placeDetails.geometry.location.lng()
          const eventLocationAddress = placeDetails.formatted_address.includes(
            placeDetails.name,
          )
            ? placeDetails.formatted_address
            : `${placeDetails.name}, ${placeDetails.formatted_address}`

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlacePredictionsLoading],
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
      setInputValue('')
    },
    [],
  )

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault()
      if (!event.relatedTarget) {
        if (!placeSelected?.eventLocationAddress && place?.city) {
          setInputValue(place.city)
        }
        if (placeSelected?.eventLocationAddress) {
          setInputValue(placeSelected.eventLocationAddress)
        }
        setShow(false)
      }
      if (event.relatedTarget?.id === 'SearchByWordsInput') {
        setShow(false)
      }
    },
    [place, placeSelected],
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
