'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

const GoogleMapsContext = createContext<{ isLoaded: boolean }>({
  isLoaded: false,
})

export const GoogleMapsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true)
      return
    }

    const handleScriptLoad = () => {
      setIsLoaded(true)
    }

    window.addEventListener('load', handleScriptLoad)

    return () => {
      window.removeEventListener('load', handleScriptLoad)
    }
  }, [])

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export const useGoogleMaps = () => useContext(GoogleMapsContext)
