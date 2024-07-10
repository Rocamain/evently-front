'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'

const MAX_IMAGES = 5

interface ImageUpload {
  file: File
  previewUrl: string
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
            return compressedFile
          } catch (error) {
            console.error('Error compressing image:', error)
            return file
          }
        }),
      )

      const newImages: ImageUpload[] = compressedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
      setImages((prevImages) =>
        [...prevImages, ...newImages].slice(0, MAX_IMAGES),
      )
    }
  }

  const handleRemove = (index: number) => {
    const newImages = [...images]
    const removedImage = newImages.splice(index, 1)[0]
    URL.revokeObjectURL(removedImage.previewUrl)
    setImages(newImages)
  }

  const uploadImages = async () => {
    const buffers = await Promise.all(
      images.map(async (image) => {
        const arrayBuffer = await image.file.arrayBuffer()
        return Buffer.from(arrayBuffer)
      }),
    )

    const response = await fetch('/api/upload-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images: buffers }),
    })

    const result = await response.json()
    console.log(result)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="border-dashed border-2 border-gray-300 p-4 m-4 rounded-lg cursor-pointer"
        onClick={() => inputFileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          className="hidden"
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
              X
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={uploadImages}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Upload Images
      </button>
    </div>
  )
}

export default EventPicturesInput
