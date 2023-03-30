import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../baseUrl';
import axios from 'axios';

const loginUrl = baseUrl + '/employees/sign_in';
const logoutUrl = baseUrl + '/employees/sign_out';

export const getLoggedInCredentials = createAsyncThunk(
  'getLoggedInCredentials/',
  async (payloadData) => {
    try {
      return axios.post(loginUrl, {
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

export const loggout = createAsyncThunk(
  'loggout/',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(logoutUrl,{ withCredentials: true });
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = null;

export const LoginSlice = createSlice({
  name: 'loggedInEmployee',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInCredentials.fulfilled, (state, action) => {
      let loggedInEmployee = JSON.stringify(action.payload.data);
      sessionStorage.setItem('user', loggedInEmployee);
      return true;
    });
    builder.addCase(getLoggedInCredentials.rejected, (state, action) => {
      // Code to run if the login fails, e.g. show an error message
      alert('Login failed. Please try again.');
    });
    builder.addCase(loggout.fulfilled, (state, action) => {
      sessionStorage.removeItem("user")
      return null;
    });
  },

  
});
export const { clearSession } = LoginSlice.actions;
export default LoginSlice.reducer;
