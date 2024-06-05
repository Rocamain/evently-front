export interface EventAddressInfo {
  info: string
  types: string[]
}

interface EventLocation {
  id: string
  name?: string
  address?: google.maps.GeocoderAddressComponent[]
  lat?: number
  lng?: number
}

export interface ValidationErrors {
  eventTitle?: string[] | undefined
  eventLink?: string[] | undefined
  eventLocation?: string[] | undefined
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
