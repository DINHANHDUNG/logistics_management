import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  licensePlate: yup.string().required('Vui lòng nhập biển số xe'),
  seller: yup.string().required('Vui lòng nhập đơn vị bán'),
  quantity: yup
    .number()
    // .string()
    .required('Vui lòng nhập số lượng')
    .typeError('Vui lòng nhập số')
    .positive('Số lương phải lớn hơn bằng không'),
  unitPrice: yup
    .number()
    // .string()
    .required('Vui lòng nhập giá')
    .typeError('Vui lòng nhập số')
    .positive('Giá phải lớn hơn bằng không'),
});
