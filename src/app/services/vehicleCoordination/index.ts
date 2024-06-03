import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET, POST} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';
import {
  dtoListVehicleCoordination,
  dtoUpdate,
} from '../../../types/vehicleCoordination';

export const vehicleCoordinationApi = createApi({
  reducerPath: 'vehicleCoordinationApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    getList: builder.query({
      query: (value: dtoListVehicleCoordination) => ({
        method: GET,
        url: NetWork.GetListDieuPhoiVanChuyen,
        params: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    getDetail: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetChuyenDieuPhoi,
        params: value,
      }),
      transformResponse: (response: any) => response.data, //Trả ra theo ý muốn nếu cần
    }),
    UpdateGuiLenh: builder.mutation({
      query: (value: dtoUpdate) => ({
        method: POST,
        url: NetWork.UpdateGuiLenh,
        data: value,
      }),
    }),
    UpdateBoGuiLenh: builder.mutation({
      query: (value: dtoUpdate) => ({
        method: POST,
        url: NetWork.UpdateBoGuiLenh,
        data: value,
      }),
    }),
    UpdateHuyChuyen: builder.mutation({
      query: (value: dtoUpdate) => ({
        method: POST,
        url: NetWork.UpdateHuyChuyen,
        data: value,
      }),
    }),
    UpdateDieuPhoi: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.UpdateDieuPhoi,
        data: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    UpdateStatus: builder.mutation({
      query: (value: dtoUpdate & {TrangThai: number}) => ({
        method: POST,
        url: NetWork.UpdateTrangThaiDieuPhoi,
        data: value,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetListQuery,
  useLazyGetListQuery,
  useGetDetailQuery,
  useUpdateBoGuiLenhMutation,
  useUpdateGuiLenhMutation,
  useUpdateHuyChuyenMutation,
  useUpdateDieuPhoiMutation,
  useUpdateStatusMutation
} = vehicleCoordinationApi;
