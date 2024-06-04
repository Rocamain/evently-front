'use client'
import './styles.module.css'
import { useEffect, useRef } from 'react'
import { Editor, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import StepButtons from '../../buttons/StepButtons'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  useEffect(() => {
    if (editor) editor.commands.focus('start')
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold')
            ? 'bg-teal-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-teal-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic')
            ? 'bg-teal-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-teal-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive('paragraph')
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        paragraph
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive('heading', { level: 5 })
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Title 1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive('heading', { level: 6 })
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Title 2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList')
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        List
      </button>
    </div>
  )
}

const ButtonsBar = ({
  handleBack,
  handleNext,
  isFirstStep,
  isLastStep,
}: {
  handleBack: () => void
  handleNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}) => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const { editor } = useCurrentEditor()
  if (!editor) {
    return null
  }

  return (
    <>
      <label htmlFor="EventDescription" className="sr-only" />
      <input ref={inputRef} name="EventDescription" className="sr-only" />
      <StepButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        handleNext={() => {
          if (inputRef.current) {
            inputRef.current.value = editor.getText()
          }
          handleNext()
        }}
        handleBack={handleBack}
      />
    </>
  )
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export default function EventDescriptionInput({
  handleBack,
  handleNext,
  isFirstStep,
  isLastStep,
}: {
  handleBack: () => void
  handleNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}) {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      slotAfter={
        <ButtonsBar
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      }
      extensions={extensions}
      content={''}
    ></EditorProvider>
  )
}
