import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      class: {
        default: 'text-base text-gray-600',
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          return { class: attributes.class }
        },
      },
    }
  },
})

type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

const headingClasses: Record<HeadingLevels, string> = {
  1: 'text-4xl font-bold text-gray-800',
  2: 'text-3xl font-semibold text-gray-700',
  3: 'text-2xl font-medium text-gray-600',
  4: 'text-xl font-medium text-gray-500',
  5: 'text-lg font-medium text-gray-600',
  6: 'text-base font-medium text-gray-600',
}

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      class: {
        default: '',
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          return {
            class:
              headingClasses[attributes.level as HeadingLevels] ||
              'text-xl text-gray-600',
          }
        },
      },
    }
  },
})

export const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      class: {
        default: 'list-disc list-inside',
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          return { class: attributes.class }
        },
      },
    }
  },
})
