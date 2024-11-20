import Link from 'next/link'
import { fetchGeo } from '@/lib/utils/geo'
import NavBar from './NavBar/NavBar'
import Image from 'next/image'
import SearchBar from './SearchBar/SearchBar'
import Menu from './Menu/Menu'
import fetchDevice from '@/lib/utils/fetcDevice'
import { verifySession } from '@/lib/auth/session'

export default async function Header(props: unknown) {
  const { city, latitude, longitude } = await fetchGeo()
  const device = await fetchDevice()
  const isVerifiedSession = await verifySession()

  if (device === 'mobile') {
    return (
      <>
        <div className="border-b fixed z-10 w-full z-50 bg-white top-0 sm:block">
          <div className="px-4 py-5 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 mx-auto">
            <div className="flex flex-row items-center justify-between gap-3">
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
              <NavBar isVerifiedSession={isVerifiedSession} />
            </div>
            <SearchBar
              mobile
              city={city}
              latitude={latitude}
              longitude={longitude}
            />
          </div>
        </div>
        <Menu />
      </>
    )
  }

  return (
    <>
      <div className="border-b fixed w-full py-5 z-50 bg-white top-0 sm:block">
        <div className="relative z-10 px-4 pt-3 sm:px-6 md:max-w-4xl lg:max-w-6xl xl:px-4 w-full mx-auto">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex grow sm:items-center sm:justify-start">
              <div className="flex flex-grow-0">
                <Link
                  href="/"
                  className="text-lg mr-0 md:mr-8 mb:0 w-[110px] sm:w-[180px]"
                >
                  <Image
                    className="w-full h-full"
                    src="/images/Logo.png"
                    alt="Evently logo"
                    width={140}
                    height={70}
                    priority={true}
                  />
                </Link>
              </div>

              <SearchBar
                city={city}
                latitude={latitude}
                longitude={longitude}
              />
            </div>

            <NavBar isVerifiedSession={isVerifiedSession} />
          </div>
        </div>
      </div>

      {isVerifiedSession && <Menu />}
    </>
  )
}
