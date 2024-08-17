import LinkButton from '@/ui/buttons/LinkButton/LinkButton'

export default async function NotFoundEvent() {
  return (
    <div className="min-h-80 flex flex-col justify-center items-center gap-8">
      <div className=" flex">
        <h1 className="inline-block m-0 mr-5 p-0 pr-6 text-2xl border-0 border-r-2 font-medium align-top leading-[49px]">
          404
        </h1>
        <h2 className="text-lg text-gray-600 font-normal leading-[49px] m-0">
          Event could not be found.
        </h2>
      </div>
      <LinkButton variant="contained" href="/">
        Go home
      </LinkButton>
    </div>
  )
}
