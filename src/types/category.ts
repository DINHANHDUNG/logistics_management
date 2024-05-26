export interface itemKH {
  ID: number;
  Code: string;
  Name: string;
}

export type itemHangHoa = itemKH;
export type itemDonViVanTai = itemKH;

export interface itemDiaDiem {
  ID: number;
  Address: string;
  Name: string;
}

export type itemLoaiXe = itemKH & {TrongTai: number};

export interface itemXeVanChuyen {
  ID: number;
  BienSoXe: string;
  LaiXe: string;
  LoaiXe: string;
}

export interface itemNhanVien {
  ID: number;
  HoTen: string;
  MaNhanSu: string;
}
