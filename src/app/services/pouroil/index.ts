import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET, POST} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';

export const pouroilApi = createApi({
  reducerPath: 'pouroilApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    GetListDoDau: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetListDoDau,
        params: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
    GetDetailDoDau: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetDoDau,
        params: value,
      }),
      transformResponse: (response: any) => response.data.data,
    }),
    DeleteDoDau: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.DeleteDoDau,
        data: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
    UpdateDoDau: builder.mutation({
      query: value => ({
        method: POST,
        url: NetWork.UpdateDoDau,
        data: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLazyGetListDoDauQuery,
  useDeleteDoDauMutation,
  useGetDetailDoDauQuery,
  useUpdateDoDauMutation,
} = pouroilApi;
