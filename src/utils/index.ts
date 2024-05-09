// import { Cookies } from 'react-cookie'

// const cookies = new Cookies()

// export const getToken = (name: string): string | undefined => cookies.get(name, { doNotParse: true })

// export const setToken = (name: string, value: string, age: number): void =>
//   cookies.set(name, value, { path: '/', maxAge: age })

// export const removeToken = (name: string): void => cookies.remove(name, { path: '/' })

// Type cho hàm tạo số ngẫu nhiên trong phạm vi từ min đến max
type GenerateRandomNumber = (min: number, max: number) => number

// Hàm tạo số ngẫu nhiên trong phạm vi từ min đến max
export const generateRandomNumber: GenerateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Type cho hàm tạo màu rgba ngẫu nhiên
type GenerateRandomColor = () => string

// Hàm tạo màu rgba ngẫu nhiên
export const generateRandomColor: GenerateRandomColor = () => {
  const r = Math.floor(Math.random() * 256) // Tạo một giá trị ngẫu nhiên cho phần red (0 - 255)
  const g = Math.floor(Math.random() * 256) // Tạo một giá trị ngẫu nhiên cho phần green (0 - 255)
  const b = Math.floor(Math.random() * 256) // Tạo một giá trị ngẫu nhiên cho phần blue (0 - 255)
  const a = Math.random().toFixed(2) // Tạo một giá trị ngẫu nhiên cho phần alpha (0.00 - 1.00)

  return `rgba(${r}, ${g}, ${b}, ${a})` // Trả về màu rgba được tạo
}
