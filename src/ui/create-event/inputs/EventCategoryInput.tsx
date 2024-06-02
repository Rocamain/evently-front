export default function EventCategoryInput() {
  const categories = [
    'Social',
    'Tech',
    'Cooking',
    'Sport',
    'Games',
    'Professional',
    'Hikes',
    'Travel',
    'Other',
  ]

  return (
    <fieldset className="ml-6 mb-6">
      <legend className="mb-4 font-bold">Choose a category</legend>
      <div className="grid grid-cols-4 gap-4 w-[500px]">
        {categories.map((category) => (
          <div className="flex items-center" key={category}>
            <input
              type="radio"
              id={category}
              name="EventCategory"
              value={category}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={category} className="ms-2 font-medium">
              {category}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
