'use client'
import { WhiteMagnifier } from '@/ui/Icons'
import SearchByWordsInput from './SearchInput'
import PlacesAutoCompleteInput from './PlacesAutoCompleteInput'
import fetchGeo from '@/lib/utils/fetchGeo'

interface SearchBarProps {
  mobile?: boolean
  city: string
}
export default function SearchBar({ mobile = false, city }: SearchBarProps) {
  // PENDING IMPLEMENTATION
  // const searchByWords = async (formData: FormData) => {
  //   'use server'
  // }

  const isMobile = mobile ? 'mt-10 mx-auto lg:hidden' : 'hidden'

  return (
    <form
      //action= PENDING IMPLMENTATION
      className={`realtive grow w-full sm:max-w-xl flex sm:flex-row items-center justify-center lg:flex lg:flex-row lg:items-center ${isMobile}`}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="sm:flex w-full">
        <SearchByWordsInput />
        <PlacesAutoCompleteInput city={city} />
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
