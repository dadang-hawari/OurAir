export const BtnCariPenerbangan = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary font-[600] text-white hover:bg-primary transition-colors w-full h-12 rounded-b-xl absolute left-0 bottom-0"
    >
      Cari Penerbangan
    </button>
  )
}
