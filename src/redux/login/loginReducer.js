import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../baseUrl';
import axios from 'axios';

const url = baseUrl + '/employees/sign_in';

export const getLoggedInCredentials = createAsyncThunk(
  'getLoggedInCredentials/',
  async (payloadData) => {
    console.log('payloadData')
    console.log(payloadData)
    try {
      return axios.post(url, {
        employee: {
          email: payloadData.email,
          password: payloadData.password
        }
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

const initialState = null;

export const LoginSlice = createSlice({
  name: 'loggedInEmployee',
  initialState,
  reducers: {
    clearSession() {
      return null;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInCredentials.fulfilled, (state, action) => {
      let loggedInEmployee = JSON.stringify(action.payload.data);
      sessionStorage.setItem('user', loggedInEmployee);
      return true;
    });
  },
});
export const { clearSession } = LoginSlice.actions;
export default LoginSlice.reducer;
