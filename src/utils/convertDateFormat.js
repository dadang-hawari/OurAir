export const convertDateFormat = (dateString) => {
  if (dateString === 'Jadwal Kembali' || dateString === 'Tanggal Berangkat') return
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Bulan dimulai dari 0, jadi tambahkan 1
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
