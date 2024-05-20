export default function SearchByWordsInput() {
  return (
    <input
      id="SearchByWordsInput"
      name="searchText"
      type="text"
      autoComplete="off"
      placeholder="Search for events"
      className="flex-grow w-full sm:w-1/2 outline-none appearance-none text-md text-gray-600 p-3 pl-4 rounded-tl-lg :rounded-l-lg border border-gray-400  hover:border-gray-300 focus:border-red-400 hover:z-10 focus:z-10  rounded-r-none placeholder:text-gray-500"
    />
  )
}
