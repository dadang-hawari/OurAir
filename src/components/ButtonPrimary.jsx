export default function ButtonPrimary({ onClick, text, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white max-w-[568px] w-full h-[48px] rounded-2xl hover:bg-[#0c60a5] transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
