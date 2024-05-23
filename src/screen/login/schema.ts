import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  UserName: yup
    .string()
    // .email('Email không đúng định dạng')
    .required('Vui lòng nhập tài khoản'),
  ProductKey: yup
    .string()
    // .email('Email không đúng định dạng')
    .required('Vui lòng nhập key'),
  Password: yup
    .string()
    .min(6, ({min}) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Vui lòng nhập mật khẩu'),
});
