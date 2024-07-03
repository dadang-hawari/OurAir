export default function ButtonPrimary({ onClick, text, className, isDisabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${
        isDisabled ? 'cursor-default' : ' hover:bg-secondary'
      } bg-blue-500 text-white max-w-[568px] w-full h-[48px] rounded-2xl transition-colors ${className}`}
    >
      {text}
    </button>
  )
}
