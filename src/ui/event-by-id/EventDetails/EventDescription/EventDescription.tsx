'use client'
import { useRef } from 'react'
import { EventDescriptionEdit } from './EventDescriptionEdit'
import { generateHTML } from '@tiptap/html'
import { EditorContent } from '@tiptap/react'
import { useEditor } from '@tiptap/react'

interface EventDetailsProps {
  eventDescription: string
  isOwner: boolean
}
import StarterKit from '@tiptap/starter-kit'
import {
  CustomBulletList as List,
  CustomHeading as Header,
  CustomParagraph as Paragraph,
} from '@/lib/titap-custom'
// const extensions = [StarterKit, List, Header, Paragraph]

export const EventDescription: React.FC<EventDetailsProps> = ({
  eventDescription,
  isOwner,
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
    <div className="py-6 lg:py-0 px-5 sm:px-10 md:px-20 lg:px-0">
      <h4 className="text-xl font-bold">Details</h4>
      <div>
        <EditorContent ref={tiptap} editor={editor} />
      </div>
    </div>
  )
}
