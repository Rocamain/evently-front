'use client'
import React, { useState, useRef, useEffect, JSX } from 'react'

interface EventDescriptionEditProps {
  data: string
  label?: string
  type: string
  placeholder?: string
  autoFocus?: boolean
  handleInput?: (inputData: string, inputValue: string) => void
  handleResetError?: () => void
  pattern?: string
  name: 'eventDescription'
}
export const EventDescriptionEdit: React.FC<EventDescriptionEditProps> = ({
  data,
  name,
}) => {
  const [inputData, setInputData] = useState<string>(data)
  const [isEdit, setEdit] = useState<boolean>(false)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [isTyped, setTyped] = useState<boolean>(false)
  const [isRegexValid, setRegexValid] = useState<boolean>(true)
  const [textareaHeight, setTextareaHeight] = useState('auto')
  const [inputParagraphs, setInputParagraphs] = useState<JSX.Element[]>(
    inputData
      .split('\n')
      .map((line, index) => <p key={`line-${index}`}>{line}</p>),
  )
  const isInitialValueChange = data !== inputData

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    } else if (inputRef.current) {
      inputRef.current.blur()
    }
  }, [isEdit])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setInputData(value)
    setTyped(true)
    setRegexValid(true)
    // Calculate and set the textarea height dynamically
    const textareaLineHeight = 28
    const minRows = 1
    const maxRows = 10
    const previousRows = e.target.rows
    e.target.rows = minRows
    const currentRows = Math.ceil(e.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      e.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows
      e.target.style.overflowY = 'scroll'
    } else {
      e.target.style.overflowY = 'hidden'
    }

    // Set a min-height to prevent small text from overflowing
    e.target.style.minHeight = 'calc(1.5em + 2px)' // Adjust the value as needed

    // Set the actual height
    setTextareaHeight(e.target.scrollHeight + 'px')
  }

  const handleClick = () => {
    if (isEdit) {
      // Split the input data by newline characters and map to <p> tags
      const pattern: RegExp = /^\s+$/

      const paragraphs = inputData.split('\n').map((line, index) => {
        return pattern.test(line) || line.length === 0 ? (
          <br key={`line-${index}`} />
        ) : (
          <p key={`line-${index}`}>{line}</p>
        )
      })

      // Update the inputParagraphs state with the paragraphs
      setInputParagraphs(paragraphs)
    }
    setEdit((prev) => !prev)
  }

  return (
    <div className="mx-4 py-5 relative">
      <div className="flex gap-5 mb-5">
        <h4 className="text-xl font-bold ">Details</h4>
        <button
          onClick={handleClick}
          type="button"
          className="text-gray-400 hover:text-red-400  text-xl font-bold"
        >
          {isEdit ? 'Save' : 'Edit'}
        </button>
      </div>

      {isEdit ? (
        // Render an input field when in edit mode
        <div className="relative flex">
          <textarea
            style={{ height: textareaHeight }}
            className="p-2 w-full overflow-hidden focus:outline-none focus:ring focus:border-blue-400 focus:rounded-lg"
            ref={inputRef}
            id={name}
            name={name}
            value={inputData}
            onChange={handleChange}
            onBlur={() => {
              setTimeout(() => {
                if (isEdit) {
                  setEdit(false)
                }
              }, 180)
            }}
            minLength={20}
            maxLength={200}
          />
          {/* If in edit mode and isTyped is true, render an 'x' or a '✓' depending on regex validation */}
          {isTyped && (
            <div className="pl-2 w-5 absolute right-2 top-2">
              {isRegexValid ? (
                <span className="text-xl text-green-500">✓</span>
              ) : (
                <span className="text-xl text-red-500">✖</span>
              )}
            </div>
          )}
        </div>
      ) : // If the initial value has changed, render a read-only input
      // The form action will receive the info to be sent
      !isInitialValueChange ? (
        <div className="mb-5 border border-transparent rounded-lg">
          {inputParagraphs}
        </div>
      ) : (
        <textarea
          id={name}
          name={name}
          className="mb-5 border border-transparent rounded-lg bg-transparent w-full overflow-hidden focus:outline-none"
          style={{ height: textareaHeight }}
          value={inputData}
          readOnly
        />
      )}
    </div>
  )
}
