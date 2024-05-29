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
        onClick={handleBack}
        disabled={isFirstStep}
        className={`px-4 py-2 rounded ${isFirstStep ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Back
      </button>
      <button
        onClick={handleNext}
        disabled={isLastStep}
        className={`px-4 py-2 rounded ${isLastStep ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Continue
      </button>
    </div>
  )
}
