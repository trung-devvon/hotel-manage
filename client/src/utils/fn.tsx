export const createSlug = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('')
    .toUpperCase()
export const generateCodeUnique = (string: string) => createSlug(string) + Date.now().toString(36).toUpperCase()
export const generateCode = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[^a-zA-Z ]/g, '') // Loại bỏ các ký tự không phải là chữ cái và không phải khoảng trắng
    .slice(0, 10)
    .toUpperCase()
    .replace(/ /g, '') // Loại bỏ tất cả khoảng trắng
    .split('')
    .reverse()
    .join('')

export const generateRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => start + index)
}

const getToday = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
export const getTodayAndTomorrow = () => {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(today.getDate() + 1)

  // Hàm format ngày theo định dạng YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0 nên cần cộng 1
    const day = String(date.getDate()).padStart(2, '0') // Đảm bảo ngày có 2 chữ số

    return `${year}-${month}-${day}`
  }

  return {
    startDate: formatDate(today),
    endDate: formatDate(tomorrow)
  }
}

export const getDaysOfRange = (date: any) => {
  if (!date?.startDate || !date?.endDate) return 0
  const { startDate, endDate } = date
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const firstDate: any = new Date(startDate)
  const secondDate: any = new Date(endDate)
  return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1
}
