import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  BienSoXe: yup.string(),
  LaiXe: yup.string(),
  DTLaiXe: yup.string(),
  SoGioCho: yup.string(),
  SoCaLuu: yup.string(),
  VeBenBai: yup.string(),
  PhatSinhKhac: yup.string(),
  GhiChu: yup.string(),
  IDDonViVanTai: yup.string(),
});
