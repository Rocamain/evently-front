export interface EventAddressInfo {
  info: string
  types: string[]
}

export interface EventLocation {
  id: string
  name?: string
  address?: google.maps.GeocoderAddressComponent[]
  lat?: number
  lng?: number
}

export interface ValidationErrors {
  EventTitle?: string[] | undefined
  EventLink?: string[] | undefined
  EventLocation?: string[] | undefined
  EventCategory?: string[] | undefined
  EventPrice?: string[] | undefined
  EventTime?: string[] | undefined
  EventDate?: string[] | undefined
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
