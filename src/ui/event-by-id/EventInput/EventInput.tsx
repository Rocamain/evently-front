'use client'
import React, { useState, useRef, useEffect } from 'react'
interface InputProps {
  data: string
  label?: string
  type: string
  placeholder?: string
  autoFocus?: boolean
  handleInput?: (inputData: string, inputValue: string) => void
  handleResetError?: () => void
  pattern?: string
  name:
    | 'eventTitle'
    | 'eventPhotos'
    | 'eventDescription'
    | 'eventTime'
    | 'eventLink'
    | 'eventPrice'
  className: string
}

export const EventInput = ({
  data,
  type,
  name,
  className,
  pattern,
}: InputProps) => {
  const [inputData, setInputData] = useState<string>(data)
  const [isEdit, setEdit] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isTyped, setTyped] = useState<boolean>(false)
  const [isRegexValid, setRegexValid] = useState<boolean>(true)

  // Manages the focus or blur depending on whether the "Edit" button is pressed
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    } else if (inputRef.current) {
      inputRef.current.blur()
    }
  }, [isEdit])

  const isInitialValueChange = data !== inputData

  const inputStyleRead: React.CSSProperties = {
    width: `${inputData.length * 14}px`,
  }
  const inputStyleEdit: React.CSSProperties = {
    width: `${(inputData.length + 2) * 14}px`,
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, pattern } = e.target
    setInputData(value)
    setTyped(true)
    setRegexValid(value.match(pattern) !== null)
  }

  const handleClick = () => {
    setEdit((prev) => !prev)
  }

  return (
    <>
      <div className="relative flex">
        {isEdit ? (
          // Render an input field when in edit mode
          <input
            ref={inputRef}
            id="eventTitle"
            name={name}
            className={
              'p-2 text-2xl xl:text-3xl font-bold rounded-lg w-inherit overflow-hidden focus:outline-none focus:ring focus:border-blue-400 focus:rounded-lg focus:w-auto'
            }
            style={inputStyleEdit}
            type={type}
            value={inputData}
            pattern={pattern}
            onChange={handleChange}
            size={inputData.length}
          />
        ) : // If the initial value has changed, render a read-only input
        // The form action will receive the info to be sent
        !isInitialValueChange ? (
          <h3 className={className}>{inputData}</h3>
        ) : (
          <input
            id={name}
            name={name}
            className={
              'pl-2 text-2xl xl:text-3xl font-bold rounded-lg p-2 w-inherit overflow-hidden focus:outline-none focus:ring focus:border-blue-400 focus:rounded-lg focus:w-auto'
            }
            style={inputStyleRead}
            type={type}
            value={inputData}
            readOnly
          />
        )}
        {/* If in edit mode and isTyped is true, render an 'x' or a '✓' depending on regex validation */}
        {isTyped && isEdit && (
          <div className="pl-2 w-5 absolute right-2">
            {isRegexValid ? (
              <span className="text-xl text-green-500">✓</span>
            ) : (
              <span className="text-xl text-red-500">✖</span>
            )}
          </div>
        )}
      </div>

      {/* Render the "Edit" or "Save" button */}
      <button
        onClick={handleClick}
        type="button"
        className="text-gray-400 hover:text-red-400 text-xl font-bold"
      >
        {isEdit ? 'Save' : 'Edit'}
      </button>
    </>
  )
}
