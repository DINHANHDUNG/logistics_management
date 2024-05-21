import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {dataUser} from '../../../types/auth';
import {RootState} from '../../store';

const initialState: dataUser = {
  DatabaseName: '',
  DatabasePassword: '',
  DatabaseServerName: '',
  DatabaseUserName: '',
  FlagQuanLy: false,
  HoTen: '',
  IDUser: 0,
  Key: '',
  Pass: '',
  Username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUser: (state, action: any) => {
      state.DatabaseName = action.payload.DatabaseName;
      state.DatabasePassword = action.payload.DatabasePassword;
      state.DatabaseServerName = action.payload.DatabaseServerName;
      state.DatabaseUserName = action.payload.DatabaseUserName;
      state.FlagQuanLy = action.payload.FlagQuanLy;
      state.HoTen = action.payload.HoTen;
      state.IDUser = action.payload.IDUser;
      state.Key = action.payload.Key;
      state.Pass = action.payload.Pass;
      state.Username = action.payload.Username;
    },
  },
});

export const authStore = (state: RootState) => state.auth; //acc
// Action creators are generated for each case reducer function
export const {changeUser} = authSlice.actions;

export default authSlice.reducer;
