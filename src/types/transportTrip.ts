export type dtoListTransportTrip = {
  ProductKey: string;
  Limit: number;
  Page: number;
  IDUser: number;
  dtS: string;
  dtE: string;
};

export type dataTransportTrip = {
  ProductKey: any;
  IDChuyen: number;
  NgayDongHangCal: string;
  NgayDongHang: string;
  NgayTraHangCal: string;
  NgayTraHang: string;
  DiemDi: string;
  DiemDen: string;
  SoPL: string;
  SoKhoi: string;
  SoGioCho: any;
  SoCaLuu: any;
  VeBenBai: any;
  PhatSinhKhac: any;
  GhiChu: any;
  MaDieuVan: any;
  SoKG: string;
  BienSoXe: any;
  LaiXe: any;
  LoaiXe: string;
  DonViVanTai: string;
  KhachHang: string;
  HangHoa: string;
  HangVe: string;
  TrangThaiDieuPhoiIn: any;
  TrangThaiDieuPhoiOut: string;
  ThoiGianVeCal: any;
  TrangThaiVanChuyen: any;
  ThoiGianVe: string;
};

export interface dataSubmit {
  NgayDongHang: Date;
  GioDongHang: string;
  NgayTraHang: Date;
  GioTraHang: string;
  IDDiemDi: string;
  IDDiemDen: string;
  IDHangHoa: string;
  SoKG: string;
  SoKhoi: string;
  SoPL: string;
  FlagHangVe: boolean;
  ThoiGianVe: string;
  IDKhachHang: string;
  IDLoaiXe: string;
}
