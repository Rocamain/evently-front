export default function DateAndTimeInput() {
  return (
    <div className="flex gap-2">
      <div className="relative  w-[90px]">
        <div className="absolute inset-y-0 start-2 top-0 flex items-center ps-0.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="time"
          id="time"
          className="pl-8  bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          // min="09:00"
          // max="18:00"
          // value="00:00"
          required
        />
      </div>
      <div className="w-[160px]">
        <input
          type="date"
          id="time"
          className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          // min="09:00"
          // max="18:00"
          // value="00:00"
          required
        />
      </div>
    </div>
  )
}
