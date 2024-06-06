export const ButtonSearch = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary font-bold text-white hover:bg-primary transition-colors duration-500 w-full h-12 rounded-b-xl absolute left-0 bottom-0"
    >
      Cari Penerbangan
    </button>
  )
}