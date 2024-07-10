import { eventCategories } from '@/lib/create-event/utils'
export default function eventCategoryInput({ error }: { error?: string[] }) {
  return (
    <fieldset className="ml-6 mb-6">
      <legend className="mb-4 font-bold">
        Choose a category
        {error && (
          <span className="text-red-500 cursor-pointer" title={error[0]}>
            *
          </span>
        )}
      </legend>
      <div className="grid grid-cols-4 gap-4 w-[500px]">
        {eventCategories.map((category) => (
          <div className="flex items-center" key={category}>
            <input
              type="radio"
              id={category}
              name="eventCategory"
              value={category}
              className="w-4 h-4 cursor-pointer text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
