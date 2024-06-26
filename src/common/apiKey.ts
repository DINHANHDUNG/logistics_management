import Config from 'react-native-config';
export const API_URL = Config.REACT_APP_BASE_URL ?? '';
export const API_IMAGE_URL = Config.REACT_APP_BASE_IMAGE_URL ?? '';

export const NetWork = {
  //Admin
  login: 'GetUserLogin',
  //Status car
  getListSttCar: 'GetTrangThaiXeTrongNgay',
  GetListChuyenXe: 'GetListChuyenXe',

  //TransportTrip
  GetListChuyenVanChuyen: 'GetListChuyenVanChuyen',
  PostChuyenVanChuyen: 'PostChuyenVanChuyen',
  DeleteChuyenVanChuyen: 'DeleteChuyenVanChuyen',
  GetChuyenVanChuyen: 'GetChuyenVanChuyen',
  PutChuyenVanChuyen: 'PutChuyenVanChuyen',

  //vehicleCoordination
  GetListDieuPhoiVanChuyen: 'GetListDieuPhoiVanChuyen',
  GetChuyenDieuPhoi: 'GetChuyenDieuPhoi',
  UpdateDieuPhoi: 'UpdateDieuPhoi',
  UpdateGuiLenh: 'UpdateGuiLenh',
  UpdateHuyChuyen: 'UpdateHuyChuyen',
  UpdateBoGuiLenh: 'UpdateBoGuiLenh',
  UpdateTrangThaiDieuPhoi: 'UpdateTrangThaiDieuPhoi',

  //report admin
  GetListSuachuaXe: 'GetListSuachuaXe',
  GetListDoDau: 'GetListDoDau',

  //Đổ dầu
  DeleteDoDau: 'DeleteDoDau',
  GetDoDau: 'GetDoDau',
  UpdateDoDau: 'UpdateDoDau',

  //Category
  listKH: 'GettblDMCustomer',
  listDiaDiem: 'GettblDMDoor',
  listHangHoa: 'GettblDMHangHoa',
  listLoaiXe: 'GettblDMLoaiXe',
  listXeVanChuyen: 'GettblDMXeOto',
  GetListXeOtoUuTien: 'GetListXeOtoUuTien',
  listNhanVien: 'GettblNhanSu',
  listDonViVanTai: 'GettblDMDonViVanTai',
  listLaiXe: 'GetThongTinTuXe',
  GettblDMTrangThaiVanChuyen: 'GettblDMTrangThaiVanChuyen',
  GetXeVanChuyen: 'GetXeVanChuyen',

  //Trạng thái
  UpdateTrangThaiVanChuyen: 'UpdateTrangThaiVanChuyen',
  GetListTrangThaiVanChuyen: 'GetListTrangThaiVanChuyen',
  DeleteTrangThaiVanChuyen: 'DeleteTrangThaiVanChuyen',
  
  //Pokemon
  pokemon: 'api/v2/',
};
