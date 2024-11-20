function addOneDayToTodayInUKTime() {
  const today = new Date()
  today.setDate(today.getDate() + 1)

  const year = today.getUTCFullYear()
  const month = String(today.getUTCMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(today.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function eventDateTimeInput({ error }: { error?: string[] }) {
  return (
    <div>
      <fieldset>
        <legend className="mb-4 font-bold">
          Set a Time and a Date Event Time
          {error && (
            <span
              className="text-red-500 cursor-pointer"
              title={'Invalid Date Time'}
            >
              *
            </span>
          )}
        </legend>
        <div className="flex gap-4">
          <div className="relative w-[100px]">
            <label htmlFor="eventTime" className="sr-only"></label>
            <label htmlFor="eventTime" className="sr-only"></label>
            {/* <div className="absolute inset-y-0 start-2 top-0 flex items-center ps-0.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div> */}
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              className="cursor-text bg-gray-100 border rounded-md leading-none border-gray-300 font-medium text-md focus:ring-red-500 focus:border-red-500 block w-full py-2 px-2.5"
            />
          </div>
          <div className="w-[160px]">
            <label htmlFor="eventDate" className="sr-only">
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              min={addOneDayToTodayInUKTime()}
              className="cursor-text bg-gray-100 border rounded-md leading-none border-gray-300 font-medium text-md focus:ring-red-500 focus:border-red-500 block w-full py-2 px-2.5"
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}
