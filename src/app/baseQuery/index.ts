import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import axios from 'axios';
import {API_URL} from '../../common/apiKey';

export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}) => {
    // console.log(baseUrl, url, params, data);
    // const accessToken = await getToken()
    const urlB = baseUrl || API_URL;
    console.log('urlB', urlB, baseUrl, params, data);

    try {
      const result = await axios({
        url: urlB + url,
        method,
        data,
        params,
        timeout: 30000,
        headers: {
          // Language: getLangGlobla(),
          // Authorization: accessToken ?? '',
          'Content-Type': 'application/json',
        },
      });
      return {
        data: {
          data: result.data,
          status: result?.status,
        },
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
