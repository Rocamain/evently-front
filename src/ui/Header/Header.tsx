import Link from 'next/link'
import fetchGeo from '@/lib/utils/fetchGeo'
import NavBar from './NavBar/NavBar'
import Image from 'next/image'
import SearchBar from './SearchBar/SearchBar'
import Menu from './Menu/Menu'
import fetchDevice from '@/lib/utils/fetcDevice'

export default async function Header() {
  const { city } = await fetchGeo()
  const device = await fetchDevice()
  console.log('header, device', device === 'mobile')
  if (device === 'mobile') {
    return (
      <>
        <div className="border-b w-full fixed z-50 bg-white top-0 sm:block">
          <div className="relative z-10 h-22 border-b px-4 py-5 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full mx-auto">
            <div className="flex flex-row items-center justify-between gap-3">
              <NavBar />
            </div>
            <SearchBar mobile city={city} />
          </div>
        </div>
        <Menu />
      </>
    )
  }
  console.log('not true')

  return (
    <>
      <div className="border-b w-full fixed z-50 bg-white top-0 sm:block">
        <div className="relative z-10 h-22 border-b px-4 py-5 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full mx-auto">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex grow sm:items-center sm:justify-start">
              <div className="flex flex-grow-0">
                <Link
                  href="/"
                  className="text-lg mr-0 md:mr-8 mb:0 w-[110px] sm:w-[140px]"
                >
                  <Image
                    src="/images/Logo.png"
                    alt="Evently logo"
                    width={140}
                    height={70}
                    priority={true}
                  />
                </Link>
              </div>

              <SearchBar city={city} />
            </div>

            <NavBar />
          </div>
        </div>
      </div>
      <Menu />
    </>
  )
}
