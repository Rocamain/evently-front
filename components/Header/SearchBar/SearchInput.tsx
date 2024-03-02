export default function SearchInput() {
  return (
    <input
      name="searchText"
      type="text"
      placeholder="Search for events"
      className="peer outline-none appearance-none text-md text-gray-600 p-3 pl-4 rounded-l-lg border border-gray-400  hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10 flex-grow w-full rounded-r-none placeholder:text-gray-500"
    />
  )
}
