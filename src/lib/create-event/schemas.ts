import { z } from 'zod'
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/webp']
const MIN_UPLOAD_SIZE = 1024 * 1024 // 1MB

const FileArraySchema = z
  .array(
    z
      .custom<File>()
      .refine(
        (file) => {
          return ACCEPTED_FILE_TYPES.includes(file.type)
        },
        {
          message: 'File must be a JPG OR WEBP',
          path: ['files'],
        },
      )
      .refine(
        (file) => {
          return !file || file.size >= MIN_UPLOAD_SIZE
        },
        {
          message: 'File size must be more than 1MB',
          path: ['files'],
        },
      ),
  )
  .min(1, 'Event requires at least one picture')

export const CreateEventSchema = z.object({
  eventTitle: z.string().min(1, 'Event title is required'),
  eventLink: z.string().url('Invalid URL'),
  eventLocationId: z.string().min(1, 'Event location ID is required'),
  eventLocationAddress: z.string().min(1, 'Event location address is required'),
  eventLocationLat: z
    .number()
    .min(-90, 'Invalid latitude')
    .max(90, 'Invalid latitude'),
  eventLocationLng: z
    .number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude'),
  eventGeoHash: z.string(),
  eventCategory: z.string().min(1, 'Event category is required'),
  eventPrice: z.number().min(0, 'Event price must be a positive number'),
  eventTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Invalid time format'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'), // Example date format YYYY-MM-DD
  eventDescription: z.string().min(1, 'Event description is required'),
  files: FileArraySchema,
})

// Define the interface
export interface CreateEventState {
  eventTitle: string
  eventLink: string
  eventLocationName: string
  eventLocationId: string
  eventLocationAddress: string
  eventLocationLat: number
  eventLocationLng: number
  eventCategory: string
  eventPrice: number
  eventTime: string
  eventDate: string
  eventDescription: string
  files: File[]
}
