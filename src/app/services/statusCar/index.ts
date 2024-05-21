import {createApi} from '@reduxjs/toolkit/query/react';
import {API_URL, NetWork} from '../../../common/apiKey';
import {GET} from '../../../common/contants';
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
  }),
});

// Export hooks for usage in functional components
export const {useLazyGetSttCarQuery} = statusCarApi;
