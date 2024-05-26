import Config from 'react-native-config';
export const API_URL = Config.REACT_APP_BASE_URL ?? '';

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

  //report admin
  GetListSuachuaXe: 'GetListSuachuaXe',
  GetListDoDau: 'GetListDoDau',

  //Category
  listKH: 'GettblDMCustomer',
  listDiaDiem: 'GettblDMDoor',
  listHangHoa: 'GettblDMHangHoa',
  listLoaiXe: 'GettblDMLoaiXe',
  listXeVanChuyen: 'GettblDMXeOto',
  listNhanVien: 'GettblNhanSu',
  listDonViVanTai: 'GettblDMDonViVanTai',

  //Pokemon
  pokemon: 'api/v2/',
};
