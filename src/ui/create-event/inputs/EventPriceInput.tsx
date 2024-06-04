export default function EventPriceInput() {
  return (
    <div>
      <label htmlFor="price" className="font-bold">
        Price
      </label>
      <div className="relative mt-4">
        <input
          type="number"
          name="EventPrice"
          id="price"
          className="block w-[90px] bg-gray-100 border rounded-md py-1.5 pl-2.5 pr-2 font-medium placeholder:text-gray-500"
          placeholder="0.00"
          aria-describedby="price-currency"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-900" id="price-currency">
            £
          </span>
        </div>
      </div>
    </div>
  )
}
