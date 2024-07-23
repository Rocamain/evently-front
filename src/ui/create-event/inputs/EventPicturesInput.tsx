'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { XMarkIcon } from '@heroicons/react/16/solid'

const MAX_IMAGES = 5

interface ImageUpload {
  file: File
  previewUrl: string
}
interface EventPicturesInputProps {
  error: boolean
}

const EventPicturesInput: React.FC<EventPicturesInputProps> = ({ error }) => {
  const [images, setImages] = useState<ImageUpload[]>([])
  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      // Cleanup URLs when component unmounts
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [images])

  const updateInputFiles = (newImages: ImageUpload[]) => {
    if (inputFileRef.current) {
      const dataTransfer = new DataTransfer()
      newImages.forEach((image) => {
        if (image.file instanceof File) {
          dataTransfer.items.add(image.file)
        }
      })
      inputFileRef.current.files = dataTransfer.files
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    handleFiles(files)
  }

  const handleFiles = async (files: FileList | null) => {
    if (files) {
      const compressedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          }
          try {
            const compressedFile = await imageCompression(file, options)
            return compressedFile instanceof File ? compressedFile : file
          } catch (error) {
            return file
          }
        }),
      )

      const newImages: ImageUpload[] = compressedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      const updatedImages = [...images, ...newImages].slice(0, MAX_IMAGES)
      setImages(updatedImages)
      updateInputFiles(updatedImages)
    }
  }

  const handleRemove = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages]
      const removedImage = newImages.splice(index, 1)[0]
      URL.revokeObjectURL(removedImage.previewUrl)
      updateInputFiles(newImages)
      return newImages
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="border-dashed border-2 border-gray-300 p-4 m-4 rounded-lg cursor-pointer"
        onClick={() => inputFileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor="eventPictures" className="sr-only"></label>
        <input
          type="file"
          className="hidden"
          id="eventPictures"
          name="eventPictures"
          accept="image/*"
          ref={inputFileRef}
          multiple
          onChange={handleFileInputChange}
        />
        <div>
          <p className="text-gray-500">
            Drag and drop or click to upload images
          </p>
          {error && (
            <span
              className="absolute right-3 top-0 text-red-500 cursor-pointer"
              title={'Invalid location'}
            >
              *
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {images.map((image, index) => (
          <div key={index} className="relative m-2">
            <Image
              src={image.previewUrl}
              alt={`Image ${index + 1}`}
              width={160}
              height={160}
              className="w-40 h-40 object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => handleRemove(index)}
            >
              <XMarkIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventPicturesInput
