import NavBar from './NavBar/NavBar'

export default function Header() {
  return (
    <header className={'border-b border-shadowColor'}>
      <div className="p-5 pb-7  md:px-10 md:pb-5 relative z-10">
        <div className="flex flex-row items-center justify-between gap-3 h-100">
          <div className="flex sm:items-center sm:justify-between">
            <div className="flex ">
              {/* <Link
                href="/"
                className="text-lg mr-0 md:mr-8 mb:0 w-[140px] h-[42px]"
              >
                <Logo />
              </Link> */}
            </div>
            {/* <SearchBar /> */}
          </div>
          <NavBar />
        </div>

        {/* <SearchBarMobile /> */}
      </div>
    </header>
  )
}
