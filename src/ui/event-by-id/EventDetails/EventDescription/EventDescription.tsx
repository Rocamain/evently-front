'use client'
import { useRef } from 'react'
import { EditorContent } from '@tiptap/react'
import { useEditor } from '@tiptap/react'

interface EventDetailsProps {
  eventDescription: string
}
import StarterKit from '@tiptap/starter-kit'
import {
  CustomBulletList as List,
  CustomHeading as Header,
  CustomParagraph as Paragraph,
} from '@/lib/titap-custom'

export const EventDescription: React.FC<EventDetailsProps> = ({
  eventDescription,
}) => {
  const tiptap = useRef<null | HTMLDivElement>(null)

  const editor = useEditor({
    editable: false,
    editorProps: {
      attributes: {
        class: 'outline-none border-none focus:outline-none',
        style: 'border: none',
      },
    },
    content: eventDescription,
    extensions: [StarterKit, List, Header, Paragraph],
  })
  return (
    <div className="border-y border-shadowColor lg:border-none bg-gray-200/40  lg:bg-transparent py-6 lg:py-0 lg:pt-6 px-5 sm:px-10 md:px-20 lg:px-0">
      <h4 className="text-xl font-bold ml-4">Details</h4>
      <div>
        <EditorContent ref={tiptap} editor={editor} />
      </div>
    </div>
  )
}
