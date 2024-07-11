export interface EventAddressInfo {
  info: string
  types: string[]
}

interface EventLocation {
  eventLocationId: string
  eventLocationAddress: string | undefined
  eventLocationLat: number
  eventLocationLng: number
}

export interface ValidationErrors {
  eventTitle?: string[] | undefined
  eventLink?: string[] | undefined
  eventLocation?: string[] | undefined
  eventLocationId?: string[] | undefined
  eventLocationAddress?: string[] | undefined
  eventLocationLng?: string[] | undefined
  eventLocationLat?: string[] | undefined
  eventGeoHash?: string[] | undefined
  eventCategory?: string[] | undefined
  eventPrice?: string[] | undefined
  eventTime?: string[] | undefined
  eventDate?: string[] | undefined
  eventDescription?: string[] | undefined
  eventPictures?: string[] | undefined
  serverError?: string | undefined
}
interface Event {
  data: {
    createdAt: string
    type: string
    eventOwnerId: string
    eventOwnerName: string
    eventOwnerEmail: string
    eventOwnerPicture: string
    eventTitle: string
    eventDescription: string
    eventCategory: string
    eventLocationId: string
    eventLocationAddress: string
    eventLocationLat: string
    eventLocationLng: string
    eventGeoHash: string
    eventDateAndTime: string
    eventPrice: number
    eventLink: string
    eventPictures: string[]
    userId: string
    eventId: string
  }
}

export type CreateEventState =
  | {
      errors: ValidationErrors
      message?: undefined
      eventId?: undefined
    }
  | {
      errors?: undefined
      message: string
      eventId?: string
    }
  | undefined
