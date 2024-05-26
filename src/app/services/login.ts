import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../common/apiKey';
import {GET} from '../../common/contants';
import {axiosBaseQuery} from '../baseQuery';
import {dtoLogin} from '../../types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({baseUrl: API_URL}),
  //   tagTypes: [],
  endpoints: builder => ({
    login: builder.query({
      query: (value: dtoLogin) => ({
        method: GET,
        url: NetWork.login,
        params: value,
      }),
      transformResponse: response => response, //Trả ra theo ý muốn nếu cần
    }),
  }),
});

// Export hooks for usage in functional components
export const {useLazyLoginQuery} = authApi;
