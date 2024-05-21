import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const Numberformat = function (number: number) {
  return new Intl.NumberFormat('vi-VN', {
    // minimumFractionDigits: 2,
  }).format(number);
};

//Format curency
export const currency = function (number: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    // minimumFractionDigits: 2,
  }).format(number);
};

export const uploadImage = (uri: string) => {
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const fileName = uploadUri.split('/').pop();

  const data = [
    {name: 'file', filename: fileName, data: RNFetchBlob.wrap(uploadUri)},
  ];

  RNFetchBlob.fetch(
    'POST',
    'http://yourserver/api/upload/upload',
    {
      'Content-Type': 'multipart/form-data',
    },
    data,
  )
    .then(res => {
      console.log(res.text());
    })
    .catch(err => {
      console.error(err);
    });
};

export const getProductKey = async () => {
  try {
    const key = await AsyncStorage.getItem('ProductKey');
    if (key !== null) {
      return key;
    }
  } catch (error) {
    console.error('Error retrieving ProductKey:', error);
  }
};
