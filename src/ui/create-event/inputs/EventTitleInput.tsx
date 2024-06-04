export default function EventTitleInput() {
  return (
    <div className="ml-6 mb-6">
      <label htmlFor="EventTitle" className="font-bold text-medium">
        The name of the event
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
