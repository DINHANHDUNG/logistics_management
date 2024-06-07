import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET, POST} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';
import {dtoLogin} from '../../../types/auth';
import {dtoGetListSttCar} from '../../../types/statusCar';

export const statusCarApi = createApi({
  reducerPath: 'statusCarApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    getSttCar: builder.query({
      query: (value: dtoGetListSttCar) => ({
        method: GET,
        url: NetWork.getListSttCar,
        params: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    GetListChuyenXe: builder.query({
      query: (value: {
        IDXe: number;
        Productkey: string;
        dtNow: string;
        Limit: number;
        Page: 1;
      }) => ({
        method: GET,
        url: NetWork.GetListChuyenXe,
        params: value,
      }),
      transformResponse: (response: any) => response.data,
    }),
    GetListTrangThaiVanChuyen: builder.query({
      query: (value) => ({
        method: GET,
        url: NetWork.GetListTrangThaiVanChuyen,
        params: value,
      }),
      transformResponse: (response: any) => response.data,
    }),
    DeleteTrangThaiVanChuyen: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.DeleteTrangThaiVanChuyen,
        data: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetSttCarQuery,
  useGetListChuyenXeQuery,
  useGetListTrangThaiVanChuyenQuery,
  useDeleteTrangThaiVanChuyenMutation
} = statusCarApi;
