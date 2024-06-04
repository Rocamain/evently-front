export default function EventLinkInput() {
  return (
    <div className="ml-6 mb-6">
      <label htmlFor="EventLink" className="font-bold text-medium">
        Event's link
      </label>
      <input
        type="url"
        id="EventLink"
        placeholder="https://example.com"
        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}
