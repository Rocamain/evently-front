import Image from 'next/image'
import { Avatar } from '@/components/Icons'

interface ProfilePictureProps {
  picture?: string | null
  loading?: boolean | undefined
}

export default function ProfilePicture({
  picture,
  loading,
}: ProfilePictureProps) {
  return (
    <div className="w-[74px] h-[74px] rounded-full flex items-center bg-red-500 border-gray-300 border-2 text-white overflow-hidden">
      {loading && (
        // Render a spinner while loading
        <div className="">
          <div className="w-[74px] h-[74px] mx-auto border-t-4 border-white border-solid rounded-full animate-spin" />
        </div>
      )}
      {!loading && picture && (
        <Image
          src={picture}
          alt="Upload preview"
          className="rounded-full object-cover h-[74px] w-auto"
          width="74"
          height="74"
        />
      )}
      {!loading && !picture && <Avatar />}
    </div>
  )
}
