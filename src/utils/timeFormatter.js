export const formatTimeToHM = (time) => {
    const formattedTime = new Date(time)
    return formattedTime.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }
  export const formatTimeToIndonesia = (time) => {
    const formattedTime = new Date(time)
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return formattedTime.toLocaleDateString('id-ID', options)
  }