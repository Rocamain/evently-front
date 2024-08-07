'use client'
import { useEffect, useRef } from 'react'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  CustomBulletList,
  CustomHeading,
  CustomParagraph,
} from '@/lib/titap-custom'
import StepButtons from '../buttons/StepButtons'

const MenuBar = ({ error }: { error?: string[] }) => {
  const { editor } = useCurrentEditor()

  useEffect(() => {
    if (editor) {
      editor.commands.focus('start')
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBold().run()
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold')
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Bold
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleItalic().run()
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic')
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Italic
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().setParagraph().run()
        }}
        className={
          editor.isActive('paragraph')
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Paragraph
      </button>

      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 5 }).run()
        }}
        className={
          editor.isActive('heading', { level: 1 })
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Header 1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 6 }).run()
        }}
        className={
          editor.isActive('heading', { level: 2 })
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Header 2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBulletList().run()
        }}
        className={
          editor.isActive('bulletList')
            ? 'bg-gray-400/75 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        List
      </button>
      {error && (
        <span className="text-red-500 cursor-pointer" title={error[0]}>
          *
        </span>
      )}
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
      <label htmlFor="eventDescription" className="sr-only" />
      <input
        ref={inputRef}
        id="eventDescription"
        name="eventDescription"
        className="sr-only"
      />
      <StepButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        handleNext={() => {
          if (inputRef.current) {
            inputRef.current.value = editor.getHTML()
          }
          handleNext()
        }}
        handleBack={handleBack}
      />
    </>
  )
}

const extensions = [
  StarterKit,
  CustomParagraph,
  CustomHeading,
  CustomBulletList,
]

export default function EventDescriptionInput({
  error,
  handleBack,
  handleNext,
  isFirstStep,
  isLastStep,
}: {
  error?: string[]
  handleBack: () => void
  handleNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}) {
  return (
    <EditorProvider
      slotBefore={<MenuBar error={error} />}
      slotAfter={
        <ButtonsBar
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      }
      extensions={extensions}
      content={'<p>Example Text</p>'}
    ></EditorProvider>
  )
}
