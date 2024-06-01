export default function Title() {
  return (
    <div>
      <label htmlFor="EventTitle" className="ml-6 pb-4 font-medium">
        Event title
      </label>
      <input
        className="mt-2 ms-6 w-full p-2 border border-gray-300 rounded mb-2"
        type="text"
        placeholder="Event Title"
        name="EventTitle"
      />
      <br />
      <fieldset className="ml-6">
        <legend className="mb-4 font-medium">Choose a category</legend>
        <div className="flex flex-wrap">
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Social"
              name="EventCategory"
              value="Social"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Social" className="ms-2 font-medium">
              Social
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Tech"
              name="EventCategory"
              value="Tech"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Tech" className="ms-2 font-medium">
              Tech
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Cooking"
              name="EventCategory"
              value="Cooking"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Cooking" className="ms-2 font-medium">
              Cooking
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Sport"
              name="EventCategory"
              value="Sport"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="Sport" className="ms-2 font-medium">
              Sport
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Games"
              name="EventCategory"
              value="Games"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Games" className="ms-2 font-medium">
              Games
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Professional"
              name="EventCategory"
              value="Professional"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Professional" className="ms-2 font-medium">
              Professional
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Hikes"
              name="EventCategory"
              value="Hikes"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label htmlFor="Hikes" className="ms-2 font-medium">
              Hikes
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Travel"
              name="EventCategory"
              value="Travel"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Travel" className="ms-2 font-medium">
              Travel
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              type="radio"
              id="Other"
              name="EventCategory"
              value="Other"
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="Other" className="ms-2 font-medium">
              Other
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
