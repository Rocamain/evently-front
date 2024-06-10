'use client'
import React, { useState, useRef } from 'react'
import NextImage from 'next/image'

const MAX_IMAGES = 5

interface ImageUpload {
  file: File
  previewUrl: string
  width: number
  height: number
}

const EventPicturesInput: React.FC = () => {
  const [images, setImages] = useState<ImageUpload[]>([])
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    handleFiles(files)
  }

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const newImagesPromises = Array.from(files).map((file) => {
        return new Promise<ImageUpload>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => {
            const img = document.createElement('img')
            img.onload = () => {
              resolve({
                file,
                previewUrl: URL.createObjectURL(file),
                width: 250,
                height: 200,
              })
            }
            img.src = reader.result as string
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(newImagesPromises).then((newImages) => {
        setImages((prevImages) =>
          [...prevImages, ...newImages].slice(0, MAX_IMAGES),
        )
      })
    }
  }

  const handleRemove = (index: number) => {
    const newImages = [...images]
    const removedImage = newImages.splice(index, 1)[0]
    URL.revokeObjectURL(removedImage.previewUrl)
    setImages(newImages)
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
        <p className="text-gray-500">Drag and drop or click to upload images</p>
      </div>
      <div className="flex flex-wrap justify-center">
        {images.map((image, index) => (
          <div key={index} className="relative m-2">
            <NextImage
              src={image.previewUrl}
              alt={`Image ${index + 1}`}
              loading={'lazy'}
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => handleRemove(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventPicturesInput
