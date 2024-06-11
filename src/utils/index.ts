// import { Cookies } from 'react-cookie'

// const cookies = new Cookies()

// export const getToken = (name: string): string | undefined => cookies.get(name, { doNotParse: true })

// export const setToken = (name: string, value: string, age: number): void =>
//   cookies.set(name, value, { path: '/', maxAge: age })

// export const removeToken = (name: string): void => cookies.remove(name, { path: '/' })

// Type cho hàm tạo số ngẫu nhiên trong phạm vi từ min đến max
type GenerateRandomNumber = (min: number, max: number) => number;

// Hàm tạo số ngẫu nhiên trong phạm vi từ min đến max
export const generateRandomNumber: GenerateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Type cho hàm tạo màu rgba ngẫu nhiên
type GenerateRandomColor = () => string;

// Hàm tạo màu rgba ngẫu nhiên
export const generateRandomColor: GenerateRandomColor = () => {
  const r = Math.floor(Math.random() * 256); // Tạo một giá trị ngẫu nhiên cho phần red (0 - 255)
  const g = Math.floor(Math.random() * 256); // Tạo một giá trị ngẫu nhiên cho phần green (0 - 255)
  const b = Math.floor(Math.random() * 256); // Tạo một giá trị ngẫu nhiên cho phần blue (0 - 255)
  const a = Math.random().toFixed(2); // Tạo một giá trị ngẫu nhiên cho phần alpha (0.00 - 1.00)

  return `rgba(${r}, ${g}, ${b}, ${a})`; // Trả về màu rgba được tạo
};

export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatCurrency2 = (amount: any) => {
  return new Intl.NumberFormat('vi-VN', {}).format(amount ? Number(amount) : 0);
};

export const formatNumberCur = (amount: any) => {
  const formattedAmount = amount
    ?.toString()
    ?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  // return formattedAmount.replace('₫', '');
  return formattedAmount;
};

export const formatCurrencyDot = (value: any) => {
  // Chuyển đổi giá trị sang chuỗi
  const stringValue = String(value);

  // Tách phần nguyên và phần thập phân (nếu có)
  const [integerPart, decimalPart] = stringValue.split(',');

  // Định dạng phần nguyên
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.',
  );

  // Nếu không có phần thập phân, chỉ cần trả về phần nguyên
  if (!decimalPart) {
    return formattedIntegerPart;
  }

  // Nếu có phần thập phân, kết hợp phần nguyên và phần thập phân lại với nhau
  return `${formattedIntegerPart},${decimalPart}`;
};

export const parseCurrencyDot = (currencyString: any) => {
  // Loại bỏ tất cả các ký tự không phải là số hoặc dấu "." trong chuỗi
  const cleanedString = currencyString.replace(/[^\d.]/g, '');

  // Chuyển đổi chuỗi thành số
  const numberValue = parseFloat(cleanedString);

  return numberValue;
};

export const getCurrentMonthLastDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  return lastDay;
};

export const maskNumber = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const formatStringToNumber = text => {
  // Kiểm tra nếu text là null hoặc rỗng
  if (text == null || text.trim() === '') {
    return 0; // hoặc giá trị mặc định nào khác bạn mong muốn
  }

  // Bước 1: Xóa các dấu chấm
  let formattedText = text.replace(/[.]/g, '');

  // Bước 2: Thay dấu phẩy bằng dấu chấm
  formattedText = formattedText.replace(/,/g, '.');

  // Bước 3: Chuyển đổi chuỗi thành số
  const number = parseFloat(formattedText);

  // Kiểm tra nếu không phải là số thì trả về 0 hoặc giá trị nào khác bạn mong muốn
  if (isNaN(number)) {
    return 0;
  }

  return number;
};
