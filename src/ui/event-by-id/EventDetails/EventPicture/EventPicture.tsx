'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'

interface EventPictureProps {
  isOwner: boolean
  eventPicture: string[]
}

const PLACEHOLDER = '/images/austin-distel-rxpThOwuVgE-unsplash.jpg'

export const EventPicture: React.FC<EventPictureProps> = ({
  isOwner,
  eventPicture,
}) => {
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState<string[] | null>(eventPicture)
  const inputRef = useRef<HTMLInputElement>(null)

  const photoUrls =
    content && content.length > 0 ? content : [PLACEHOLDER, PLACEHOLDER]

  const handleEditToggle = () => {
    if (isOwner) {
      setEdit((prev) => !prev)
    } else {
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContent([imageUrl, imageUrl])
    } else {
      setContent([PLACEHOLDER, PLACEHOLDER])
    }
  }

  return (
    <div className="pb-6 lg:py-0 sm:px-10 md:px-20  lg:px-0 sm:md:max-w-xl md:max-w-5xl lg:bg-gray-200/40  lg:max-w-2xl lg:flex-grow">
      {!isOwner ? (
        <NonOwnerImage photoUrls={photoUrls} />
      ) : edit ? (
        <EditMode
          photoUrls={photoUrls}
          handleEditToggle={handleEditToggle}
          inputRef={inputRef}
          handleChange={handleChange}
        />
      ) : (
        <OwnerImage photoUrls={photoUrls} handleEditToggle={handleEditToggle} />
      )}
    </div>
  )
}

interface NonOwnerImageProps {
  photoUrls: string[]
}

const NonOwnerImage: React.FC<NonOwnerImageProps> = ({ photoUrls }) => (
  <div className="relative w-full h-[450px]">
    <Image
      alt="Event picture"
      src={photoUrls[0]}
      fill
      className="object-cover rounded border border-t-0 rounded-t-none lg:rounded-t-lg  lg:border-t-2 border-gray-300"
      sizes="(max-width: 640px) 60vw, (max-width: 800px) 100vw, 100vw"
    />
  </div>
)

interface EditModeProps {
  photoUrls: string[]
  handleEditToggle: () => void
  inputRef: React.RefObject<HTMLInputElement>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditMode: React.FC<EditModeProps> = ({
  photoUrls,
  handleEditToggle,
  inputRef,
  handleChange,
}) => (
  <div className="relative w-full h-[450px]">
    <label
      htmlFor="fileInput"
      className="cursor-pointer relative block w-full h-full"
    >
      <div className="group relative w-full h-full">
        <Image
          alt="Event picture"
          src={photoUrls[0]}
          fill
          className="rounded-lg border border-gray-300 object-cover hover:filter hover:brightness-110"
          sizes="(max-width: 640px) 100vw, (min-width: 1024px) 1024px, 100vw"
          onClick={handleEditToggle}
        />
        <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-md p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium rounded-md">
          Change Photo
        </div>
      </div>
      <input
        id="fileInput"
        ref={inputRef}
        type="file"
        accept="image/*"
        name="files"
        onChange={handleChange}
        required
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      />
    </label>
  </div>
)

interface OwnerImageProps {
  photoUrls: string[]
  handleEditToggle: () => void
}

const OwnerImage: React.FC<OwnerImageProps> = ({
  photoUrls,
  handleEditToggle,
}) => (
  <div className="relative w-full h-[450px] rounded-lg border border-gray-300">
    <Image
      alt="Event picture"
      src={photoUrls[0]}
      fill
      className="object-cover hover:filter hover:brightness-110"
      sizes="(max-width: 640px) 100vw, (min-width: 1024px) 1024px, 100vw"
      onClick={handleEditToggle}
    />
    <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-md p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium rounded-md">
      Change Photo
    </div>
  </div>
)

export default EventPicture
