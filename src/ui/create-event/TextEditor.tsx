'use client'
import './styles.css'
import { useEffect, useState } from 'react'
import { Editor, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import StepButtons from './StepButtons'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }
  useEffect(() => {
    editor.commands.focus('start')
  }, [])

  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold')
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
        }
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic')
            ? 'bg-cyan-200 hover:bg-red-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
            : 'bg-gray-200 hover:bg-cyan-200 text-gray-800 font-semibold py-[2px] px-2 border border-gray-400 rounded shadow'
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
  const { editor } = useCurrentEditor()
  if (!editor) {
    return null
  }

  useEffect(() => {
    console.log(editor.getHTML())
  }, [editor.getText()])

  return (
    <StepButtons
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      handleNext={handleNext}
      handleBack={handleBack}
    />
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
const handleUpdate = ({ editor }: { editor: Editor }) => {
  console.log(editor.getText())
}

export default ({
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
