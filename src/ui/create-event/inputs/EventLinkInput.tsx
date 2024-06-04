export default function EventLinkInput({ error }: { error?: string[] }) {
  return (
    <div className="ml-6 mb-6">
      <label htmlFor="EventLink" className="font-bold text-medium">
        Event link
        {error && (
          <span className="text-red-500 cursor-pointer" title={error[0]}>
            *
          </span>
        )}
      </label>
      <input
        type="url"
        name="EventLink"
        pattern=".*"
        placeholder={'https://example.com'}
        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}
