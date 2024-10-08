import Link from 'next/link'
import NavBar from './NavBar/NavBar'
import Image from 'next/image'
import SearchBar from './SearchBar/SearchBar'

export default function Header() {
  return (
    <div className="border-b">
      <div className="p-5 pb-7 md:px-10 md:pb-5 relative z-10 h-22">
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

            <SearchBar />
          </div>

          <NavBar />
        </div>

        <SearchBar mobile />
      </div>
    </div>
  )
}
