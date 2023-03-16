import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../baseUrl';



export const getEmployees = createAsyncThunk(
  'getEmployees/',
  async () => {
    try {
      return axios.get(baseUrl,{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const getSubscriptionTypes = createAsyncThunk(
  'getSubscriptionTypes/',
  async () => {
    try {
      return axios.get(baseUrl + '/subscription_types',{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  employees: null,
  subscriptionTypes: [],
};

export const dataBaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    // toggleReservation(state, action) {
    //   const newState = state.map((el) => (
    //     el.id === action.payload
    //       ? { ...el, reserved: !el.reserved } : el));
    //   return newState;
    // },

  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      const employees = action.payload.data
      return {...state,employees};
    });

    builder.addCase(getSubscriptionTypes.fulfilled, (state, action) => {
      const subscriptionTypes = action.payload.data
      return {...state,subscriptionTypes};
    });
  }, 
});
// export const { toggleReservation } = rockestSlice.actions;
export default dataBaseSlice.reducer;
