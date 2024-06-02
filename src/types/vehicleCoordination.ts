export type dtoListVehicleCoordination = {
  ProductKey: string;
  Limit: number;
  Page: number;
  IDUser: number;
  dtS: string;
  dtE: string;
};

export type dtoUpdate = {
  ProductKey: string;
  IDChuyen: number;
  IDUser: number;
};


export type dataVehicleCoordination = {
  RGB: string;
  ProductKey: any;
  IDChuyen: number;
  IDLaiXe: number;
  NgayDongHangCal: string;
  NgayDongHang: string;
  NgayTraHangCal: string;
  NgayTraHang: string;
  DiemDi: string;
  DiemDen: string;
  SoPL: string;
  SoKhoi: string;
  SoGioCho: string;
  SoCaLuu: string;
  VeBenBai: string;
  PhatSinhKhac: any;
  GhiChu: any;
  MaDieuVan: string;
  SoKG: string;
  BienSoXe: string;
  LaiXe: string;
  LoaiXe: string;
  DonViVanTai: string;
  KhachHang: string;
  HangHoa: string;
  HangVe: string;
  TrangThaiDieuPhoiIn: any;
  TrangThaiDieuPhoiOut: string;
  ThoiGianVeCal: string;
  TrangThaiVanChuyen: string;
  ThoiGianVe: string;
};

export interface dataSubmit {
  ProductKey: string;
  IDUser: number;
  IDChuyen: number;
  IDXeOto: number;
  IDLaiXe: number;
  SoGioCho: number;
  SoCaLuu: number;
  VeBenBai: number;
  PhatSinhKhac: string;
  GhiChu: string;
}
