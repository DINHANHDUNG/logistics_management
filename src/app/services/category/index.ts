import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';
import {
  itemDiaDiem,
  itemKH,
  itemHangHoa,
  itemLoaiXe,
  itemXeVanChuyen,
  itemNhanVien,
  itemDonViVanTai,
  itemXeByUser,
} from '../../../types/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    getListKH: builder.query<itemKH[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listKH,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemKH[]}}) =>
        response?.data?.data,
    }),
    getListDiaDiem: builder.query<itemDiaDiem[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listDiaDiem,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemDiaDiem[]}}) =>
        response?.data?.data,
    }),
    getListHangHoa: builder.query<itemHangHoa[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listHangHoa,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemHangHoa[]}}) =>
        response?.data?.data,
    }),
    getListLoaiXe: builder.query<itemLoaiXe[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listLoaiXe,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemLoaiXe[]}}) =>
        response?.data?.data,
    }),
    getListXeVanChuyen: builder.query<itemXeVanChuyen[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listXeVanChuyen,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemXeVanChuyen[]}}) =>
        response?.data?.data,
    }),
    getListXeOtoUuTien: builder.query<itemXeVanChuyen[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.GetListXeOtoUuTien,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemXeVanChuyen[]}}) =>
        response?.data?.data,
    }),
    getListNhanVien: builder.query<itemNhanVien[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listNhanVien,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemNhanVien[]}}) =>
        response?.data?.data,
    }),
    getListDonViVanTai: builder.query<itemDonViVanTai[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listDonViVanTai,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemDonViVanTai[]}}) =>
        response?.data?.data,
    }),
    getListlaiXe: builder.query<any[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.listLaiXe,
        params: params,
      }),
      transformResponse: (response: {data: {data: any[]}}) =>
        response?.data?.data,
    }),
    getTrangThai: builder.query<any[], unknown>({
      query: params => ({
        method: GET,
        url: NetWork.GettblDMTrangThaiVanChuyen,
        params: params,
      }),
      transformResponse: (response: {data: {data: any[]}}) =>
        response?.data?.data,
    }),
    GetXeVanChuyen: builder.query<itemXeByUser, unknown>({
      query: params => ({
        method: GET,
        url: NetWork.GetXeVanChuyen,
        params: params,
      }),
      transformResponse: (response: {data: {data: itemXeByUser}}) =>
        response?.data?.data,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetListKHQuery,
  useGetListDiaDiemQuery,
  useGetListHangHoaQuery,
  useGetListLoaiXeQuery,
  useGetListXeVanChuyenQuery,
  useGetListNhanVienQuery,
  useGetListDonViVanTaiQuery,
  useGetListlaiXeQuery,
  useLazyGetListlaiXeQuery,
  useGetTrangThaiQuery,
  useGetXeVanChuyenQuery,
  useGetListXeOtoUuTienQuery
} = categoryApi;
