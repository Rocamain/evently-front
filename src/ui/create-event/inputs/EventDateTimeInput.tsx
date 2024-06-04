export default function EventDateTimeInput() {
  return (
    <div>
      <fieldset>
        <legend className="mb-4 font-bold">Set a Time and a Date</legend>
        <div className="flex gap-4">
          <div className="relative w-[100px]">
            <label htmlFor="EventTime" className="sr-only">
              Event Time
            </label>
            <div className="absolute inset-y-0 start-2 top-0 flex items-center ps-0.5 pointer-events-none">
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
            </div>
            <input
              type="time"
              name="EventTime"
              className="pl-8 bg-gray-100 border rounded-md leading-none border-gray-300 font-medium text-md focus:ring-red-500 focus:border-red-500 block w-full py-2 px-2.5"
              defaultValue="00:00"
            />
          </div>
          <div className="w-[160px]">
            <label htmlFor="EventDate" className="sr-only">
              Event Date
            </label>
            <input
              type="date"
              name="EventDate"
              className="bg-gray-100 border rounded-md leading-none border-gray-300 font-medium text-md focus:ring-red-500 focus:border-red-500 block w-full py-2 px-2.5"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}
