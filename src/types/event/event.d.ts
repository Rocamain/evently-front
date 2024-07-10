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
  eventGeoHash?: string[] | undefined
  eventCategory?: string[] | undefined
  eventPrice?: string[] | undefined
  eventTime?: string[] | undefined
  eventDate?: string[] | undefined
  eventDescription?: string[] | undefined
  eventPictures?: string[] | undefined
}

export type CreateEventState =
  | {
      errors: ValidationErrors
      message: undefined
    }
  | {
      errors: undefined
      message: string
    }
  | undefined
