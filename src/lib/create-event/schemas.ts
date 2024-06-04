import { z } from 'zod'
import { eventCategories } from './utils'

export const CreateEventSchema = z.object({
  EventTitle: z
    .string({ message: 'Event title is required.' })
    .min(8, { message: 'Event title must be at least 8 characters long.' })
    .trim(),
  EventLink: z
    .string({ message: 'Event link is required.' })
    .url({ message: 'Event link must be an url.' })
    .trim(),
  EventLocation: z.object(
    {
      id: z.string({ message: 'Event location is required.' }),
      name: z.string({ message: 'Event location is required.' }),
      address: z.array(
        z.object({
          long_name: z.string({
            message: 'Event location does not meet the criteria.',
          }),

          short_name: z.string({
            message: 'Event location does not meet the criteria.',
          }),
          types: z
            .string({ message: 'Event location does not meet the criteria.' })
            .array(),
        }),
      ),
      lat: z.number({ message: 'Event location does not meet the criteria.' }),
      lng: z.number({ message: 'Event location does not meet the criteria.' }),
    },
    { message: 'Event location is required.' },
  ),
  EventCategory: z
    .string({
      message: 'You have to choose one of the event categories listed.',
    })
    .refine(
      (category) => {
        return !eventCategories.includes(category)
      },
      {
        message: 'You have to choose one of the event categories listed.',
        path: ['EventCategory'],
      },
    ),
  EventPrice: z.coerce
    .number({ message: 'Price must number' })
    .gte(0, { message: 'Price must greater then 0' }),
  EventTime: z.string().time(),
  EventDate: z.date().refine(
    (date) => {
      return date > new Date(Date.now())
    },
    { message: 'The date must be before today', path: ['EventDate'] },
  ),
})
