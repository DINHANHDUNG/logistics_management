import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET} from '../../../common/contants';
import {axiosBaseQuery} from '../../baseQuery';

export const reportApi = createApi({
  reducerPath: 'reportApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    GetListSuachuaXe: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetListSuachuaXe,
        params: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
    GetListDoDau: builder.query({
      query: value => ({
        method: GET,
        url: NetWork.GetListDoDau,
        params: value,
      }),
      // transformResponse: (response: any) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components
export const {useLazyGetListDoDauQuery, useLazyGetListSuachuaXeQuery} =
  reportApi;
