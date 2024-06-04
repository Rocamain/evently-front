export default function EventTitleInput({ error }: { error?: string[] }) {
  return (
    <div className="ml-6 mb-6">
      <label htmlFor="EventTitle" className="font-bold text-medium realtive">
        The name of the event
        {error && (
          <span className="text-red-500 cursor-pointer" title={error[0]}>
            *
          </span>
        )}
      </label>
      <input
        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Event Title"
        name="EventTitle"
        id="EventTitle"
      />
    </div>
  )
}
