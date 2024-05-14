import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required('Vui lòng nhập địa chỉ email'),
  password: yup
    .string()
    .min(8, ({min}) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Vui lòng nhập mật khẩu'),
});
