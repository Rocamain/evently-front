import { z } from 'zod'

const AddressComponentSchema = z.object({
  long_name: z.string(),
  short_name: z.string(),
  types: z.array(z.string()),
})

const EventLocationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  address: z.array(AddressComponentSchema).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
})

const FileArraySchema = z.array(z.custom<File>())
export const CreateEventSchema = z.object({
  eventTitle: z.string().min(1, 'Event title is required'),
  eventLink: z.string().url('Invalid URL'),
  eventLocation: z.string(),
  eventCategory: z.string().min(1, 'Event category is required'),
  eventPrice: z.number().min(0, 'Event price must be a positive number'),
  eventTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Invalid time format'),
  eventDate: z.string().date(),
  eventDescription: z.string().min(1, 'Event description is required'),
  eventPictures: FileArraySchema,
})
