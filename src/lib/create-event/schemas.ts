import { z } from 'zod'

// Define the address component schema
const AddressComponentSchema = z.object({
  long_name: z.string(),
  short_name: z.string(),
  types: z.array(z.string()),
})

// Define the EventLocation schema
const EventLocationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  address: z.array(AddressComponentSchema).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

// Custom validation for FileList
const FileListSchema = z.custom<FileList>().refine((files) => {
  return Array.from(files ?? []).length !== 0
}, 'Image is required')

export const CreateEventSchema = z.object({
  eventTitle: z.string().min(1, 'Event title is required'),
  eventLink: z.string().url('Invalid URL'),
  eventLocation: EventLocationSchema.or(z.literal('')),
  eventCategory: z.string().min(1, 'Event category is required'),
  eventPrice: z.number().min(0, 'Event price must be a positive number'),
  eventTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Invalid time format'),
  eventDate: z.date(),
  eventDescription: z.string().min(1, 'Event description is required'),
  eventPictures: FileListSchema,
})
