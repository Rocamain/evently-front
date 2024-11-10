'use client'
import { useFormState } from 'react-dom'
import { WhiteMagnifier } from '@/ui/Icons'
import SearchByWordsInput from './SearchInput'
import PlacesAutoCompleteInput from './PlacesAutoCompleteInput'
import { searchEventAction } from '@/lib/searchbar/actions'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
interface SearchBarProps {
  mobile?: boolean
  city: string
  longitude: string
  latitude: string
}
export default function SearchBar({
  mobile = false,
  city,
  latitude,
  longitude,
}: SearchBarProps) {
  const [state, dispatch] = useFormState<unknown, FormData>(
    searchEventAction,
    undefined,
  )
  const isMobile = mobile ? 'mt-10 mx-auto lg:hidden' : 'hidden'

  return (
    <form
      action={dispatch}
      className={`realtive grow w-full sm:max-w-xl flex sm:flex-row items-center justify-center lg:flex lg:flex-row lg:items-center ${isMobile}`}
    >
      <div className="sm:flex w-full">
        <SearchByWordsInput />
        <PlacesAutoCompleteInput
          city={city}
          longitude={longitude}
          latitude={latitude}
        />
      </div>

      <button
        type="submit"
        className="self-stretch  bg-red-500 rounded-r-lg border border-red-400 hover:bg-red-500 focus:z-10focus:border-red-400 flex-col items-center justify-center p-3"
        aria-label="Search events"
      >
        <WhiteMagnifier />
      </button>
    </form>
  )
}
