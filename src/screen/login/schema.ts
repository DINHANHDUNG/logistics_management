import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    // .email('Email không đúng định dạng')
    .required('Vui lòng nhập tài khoản'),
  key: yup
    .string()
    // .email('Email không đúng định dạng')
    .required('Vui lòng nhập key'),
  password: yup
    .string()
    .min(8, ({min}) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Vui lòng nhập mật khẩu'),
});
