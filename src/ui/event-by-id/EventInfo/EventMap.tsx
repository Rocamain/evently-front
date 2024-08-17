'use client'
import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import useDebouncedMediaQuery from '@/app/hooks/useDebaucedMediaQuery'
import { useGoogleMaps } from '@/app/hooks/GoogleMapsContext'
interface MapComponentProps {
  lat: number
  lng: number
}

const containerStyle = {
  height: '297px',
  border: '1px solid transparent',
  borderRadius: '0.5rem',
  top: '0',
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const coords = {
    lat,
    lng,
  }

  const isDesktop = useDebouncedMediaQuery('(min-width: 1024px)')
  const { isLoaded } = useGoogleMaps()

  return (
    <GoogleMap
      mapContainerStyle={{
        ...containerStyle,
        width: isDesktop ? '100%' : '100%',
        border: 'none', // Example of conditional styling
      }}
      center={coords}
      zoom={15}
    >
      <Marker position={coords} />
    </GoogleMap>
  )
}

export default MapComponent
