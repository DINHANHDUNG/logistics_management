import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET, POST} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';
import {dtoListTransportTrip} from '../../../types/transportTrip';

export const transportTripApi = createApi({
  reducerPath: 'transportTripApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    getList: builder.query({
      query: (value: dtoListTransportTrip) => ({
        method: GET,
        url: NetWork.GetListChuyenVanChuyen,
        params: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    getDetail: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetChuyenVanChuyen,
        params: value,
      }),
      transformResponse: (response: any) => response.data, //Trả ra theo ý muốn nếu cần
    }),
    addTransportTrip: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.PostChuyenVanChuyen,
        data: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    updateTransportTrip: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.PutChuyenVanChuyen,
        data: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
    deleteTransportTrip: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.DeleteChuyenVanChuyen,
        data: value,
      }),
      // transformResponse: (response) => response, //Trả ra theo ý muốn nếu cần
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetListQuery,
  useLazyGetListQuery,
  useAddTransportTripMutation,
  useDeleteTransportTripMutation,
  useGetDetailQuery,
  useUpdateTransportTripMutation
} = transportTripApi;
