export default function ButtonPrimary({ onClick, text, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white max-w-[568px] w-full h-[48px] rounded-2xl hover:bg-secondary transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
