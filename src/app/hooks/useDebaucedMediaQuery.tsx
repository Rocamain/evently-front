import { useState, useEffect } from 'react'

const useDebouncedMediaQuery = (query: string, delay: number = 300) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = () => {
      setMatches(mediaQuery.matches)
    }

    const debouncedHandler = debounce(handler, delay)

    mediaQuery.addEventListener('change', debouncedHandler) // Use addEventListener instead

    handler() // Initialize the state with the current media query status

    return () => {
      mediaQuery.removeEventListener('change', debouncedHandler) // Clean up the event listener
    }
  }, [query, delay])

  return matches
}

// Debounce function to limit the rate of function execution
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default useDebouncedMediaQuery
