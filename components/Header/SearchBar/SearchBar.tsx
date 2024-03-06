'use client'
import { WhiteMagnifier } from '@/components/Icons'
import SearchInput from './SearchInput'
import PlacesAutoCompleteInput from './PlacesAutoCompleteInput'

interface SearchBarProps {
  mobile?: boolean
}

export default function SearchBar({ mobile = false }: SearchBarProps) {
  // PENDING IMPLEMENTATION
  // const searchByWords = async (formData: FormData) => {
  //   'use server'
  // }
  // const handleClick = () => {
  //   console.log('clicked')
  // }

  const isMobile = mobile ? 'mt-10 mx-auto lg:hidden' : 'hidden'

  return (
    <>
      <form
        className={`realtive grow max-w-xl flex flex-row items-center justify-center lg:flex lg:flex-row lg:items-center ${isMobile}`}
        onSubmit={(event) => event.preventDefault()}
      >
        <SearchInput />
        <PlacesAutoCompleteInput />
        <div className="flex flex-row items-center justify-between bg-red-500 rounded-r-lg p-3 border border-red-400 hover:bg-red-500 focus:z-10 peer-focus:border-red-400">
          <button
            type="submit"
            className="flex-col items-center justify-center"
            aria-label="Search events"
          >
            <WhiteMagnifier />
          </button>
        </div>
      </form>
    </>
  )
}
