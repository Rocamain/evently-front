'use client'
import React, { useState, useRef } from 'react'

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

  const handleFiles = (files: FileList | null) => {
    if (files) {
      const newImages: ImageUpload[] = Array.from(files).map((file) => ({
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
            <img
              src={image.previewUrl}
              alt={`Image ${index + 1}`}
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
    </div>
  )
}

export default EventPicturesInput
