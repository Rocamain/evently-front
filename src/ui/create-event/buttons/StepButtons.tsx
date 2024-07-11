import SubmitButton from './SubmitButton'
import LinkButton from '@/ui/buttons/LinkButton/LinkButton'
export default function StepButtons({
  eventId,
  handleBack,
  handleNext,
  isFirstStep,
  isLastStep,
}: {
  eventId?: string
  handleBack: () => void
  handleNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}) {
  const isEventCreated = Boolean(eventId)

  return (
    <div>
      {!isEventCreated ? (
        <div className="flex justify-between">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleBack()
            }}
            disabled={isFirstStep}
            className={`px-4 py-2 rounded ${isFirstStep ? 'bg-gray-300 font-semibold text-gray-500 cursor-not-allowed' : 'bg-red-500 font-semibold text-white hover:bg-teal-600'}`}
          >
            Back
          </button>
          {isLastStep && <SubmitButton />}
          {!isLastStep && (
            <button
              onClick={(e) => {
                e.preventDefault()
                handleNext()
              }}
              disabled={isLastStep}
              className={`px-4 py-2 rounded ${isLastStep ? 'bg-gray-300 font-semibold text-gray-500 cursor-not-allowed' : 'bg-teal-500 font-semibold text-white hover:bg-teal-600'}`}
            >
              Continue
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-between">
          <LinkButton href={`/event/${eventId}`}>Preview</LinkButton>
        </div>
      )}
    </div>
  )
}
