import ngeohash from 'ngeohash'
import { EventLocation } from '@/types/event/event'

export const eventCategories = [
  'Social',
  'Tech',
  'Cooking',
  'Sport',
  'Games',
  'Professional',
  'Hikes',
  'Travel',
  'Other',
]

const geohashPrecision = 5

// Utility function to encode geohash

export const encodeGeohash = ({
  eventLocationLat,
  eventLocationLng,
}: {
  eventLocationLat: number
  eventLocationLng: number
}) => {
  return ngeohash.encode(eventLocationLat, eventLocationLng, geohashPrecision)
}
// Utility function to parse and set event location data

export const setFormDataFromEventLocation = (
  eventLocationData: string,
  formData: FormData,
) => {
  try {
    const parsedEventLocationData = JSON.parse(
      eventLocationData,
    ) as EventLocation
    Object.entries(parsedEventLocationData).forEach(([key, value]) =>
      formData.set(key, value),
    )
  } catch (error) {
    return {
      errors: {
        eventLocation: 'Invalid event location',
        message: 'Event creation unsuccessful',
      },
    }
  }
}
