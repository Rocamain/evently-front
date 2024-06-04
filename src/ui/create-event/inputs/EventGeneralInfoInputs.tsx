import EventTitleInput from './EventTitleInput'
import EventLinkInput from './EventLinkInput'
import EventLocationInput from './EventLocationInput'
import EventCategoryInput from './EventCategoryInput'
import EventDateTimeInput from './EventDateTimeInput'
import EventPriceInput from './EventPriceInput'

export default function EventGeneralInfoInputs() {
  return (
    <div>
      <EventTitleInput />
      <EventLinkInput />
      <EventLocationInput />
      <EventCategoryInput />
      <div className="flex gap-8 ml-6 mb-6">
        <EventPriceInput />
        <EventDateTimeInput />
      </div>
    </div>
  )
}
