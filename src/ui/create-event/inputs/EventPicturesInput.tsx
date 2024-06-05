import React, { useState, useRef } from 'react'

const MAX_IMAGES = 5

interface ImageUpload {
  file: File
  previewUrl: string
  inputRef: React.RefObject<HTMLInputElement>
}

const EventPicturesInput: React.FC = () => {
  const [images, setImages] = useState<ImageUpload[]>([])
  const inputFileRefs = Array.from({ length: MAX_IMAGES }).map(() =>
    useRef<HTMLInputElement>(null),
  )

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = e.target.files
    handleFiles(files, index)
  }

  const handleFiles = (files: FileList | null, index?: number) => {
    if (files) {
      const newImages: ImageUpload[] = Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        inputRef: inputFileRefs[index ?? 0],
      }))
      setImages((prevImages) => [...prevImages, ...newImages])
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
        onClick={() => inputFileRefs[images.length]?.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          id={`fileInput${images.length}`}
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputFileRefs[images.length]}
          onChange={(e) => {
            e.preventDefault()
            if (images.length < MAX_IMAGES) {
              handleFileInputChange(e, images.length)
            }
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
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
              className="absolute top-2 left-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              onClick={() => handleRemove(index)}
            >
              X
            </button>
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              name={`EventPicture${index + 1}`}
              ref={image.inputRef}
              onChange={(e) => {
                e.preventDefault()
                handleFileInputChange(e, index)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventPicturesInput
