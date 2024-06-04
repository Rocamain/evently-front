import SubmitButton from './SubmitButton'

function submitButton() {}

export default function StepButtons({
  handleBack,
  handleNext,
  isFirstStep,
  isLastStep,
}: {
  handleBack: () => void
  handleNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}) {
  return (
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
  )
}
