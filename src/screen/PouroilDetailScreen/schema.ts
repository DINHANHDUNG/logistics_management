import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  GioDoDau: yup.string().required('Vui lòng chọn giờ'),
  NgayDoDau: yup.string().required('Vui lòng chọn ngày'),
  IDXeOto: yup.string().required('Vui lòng chọn xe'),
  ThanhTien: yup
    .number()
    // .string()
    .required('Vui lòng nhập')
    .typeError('Vui lòng nhập số')
    .positive('Thành tiền lớn hơn bằng không'),
});
