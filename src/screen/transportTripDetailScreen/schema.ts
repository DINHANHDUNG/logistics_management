import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  NgayDongHang: yup.date().required('Chọn ngày đóng hàng'),
  GioDongHang: yup.date().required('Chọn giờ đóng hàng'),
  NgayTraHang: yup.date().required('Chọn ngày trả hàng'),
  GioTraHang: yup.date().required('Chọn giờ trả hàng'),
  IDDiemDi: yup.string().required('Chọn điểm đi'),
  IDDiemDen: yup.string().required('Chọn điểm đến'),
  IDHangHoa: yup.string(),
  SoKG: yup.number(),
  SoKhoi: yup.number(),
  SoPL: yup.number(),
  FlagHangVe: yup.boolean(),
  ThoiGianVe: yup.date(),
  IDKhachHang: yup.string().required('Chọn mã khách hàng'),
  IDLoaiXe: yup.string(),
});