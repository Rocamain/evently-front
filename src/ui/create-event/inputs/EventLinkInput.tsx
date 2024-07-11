export default function eventLinkInput({ error }: { error?: string[] }) {
  return (
    <div className="ml-6 mb-6">
      <label htmlFor="eventLink" className="font-bold text-medium">
        Event link
        {error && (
          <span className="text-red-500 cursor-pointer" title={error[0]}>
            *
          </span>
        )}
      </label>
      <input
        type="url"
        name="eventLink"
        autoComplete="off"
        pattern=".*"
        placeholder={'https://example.com'}
        className="mt-2 w-full p-2 border border-gray-300 font-medium rounded-md"
      />
    </div>
  )
}
