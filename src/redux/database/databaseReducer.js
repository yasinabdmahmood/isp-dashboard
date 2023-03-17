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

export const getSubscriptionRecords = createAsyncThunk(
  'getSubscriptionRecords/',
  async () => {
    try {
      return axios.get(baseUrl + '/subscription_records',{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const getPaymentRecords = createAsyncThunk(
  'getPaymentRecords/',
  async () => {
    try {
      return axios.get(baseUrl + '/payment_records/index',{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);



export const getClients = createAsyncThunk(
  'getClients/',
  async () => {
    try {
      return axios.get(baseUrl + '/clients',{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const createSubscriptionType = createAsyncThunk(
  'createSubscriptionType/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/subscription_types', {
        new_subscription_type: {
          category: payloadData.category,
          cost: payloadData.cost,
          profit: payloadData.profit,
        },
      },{
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
  clients: [],
  subscriptionRecords: [],
  paymentRecords: [],
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

    builder.addCase(createSubscriptionType.fulfilled, (state, action) => {
      const subscriptionType = action.payload.data.subscription_type
      return {
        ...state,
        subscriptionTypes: [...state.subscriptionTypes, subscriptionType]
      };
    });


    builder.addCase(getSubscriptionRecords.fulfilled, (state, action) => {
      const subscriptionRecords = action.payload.data
      return {...state,subscriptionRecords};
    });

    builder.addCase(getPaymentRecords.fulfilled, (state, action) => {
      const paymentRecords = action.payload.data
      return {...state,paymentRecords};
    });

    builder.addCase(getClients.fulfilled, (state, action) => {
      const clients = action.payload.data
      return {...state,clients};
    });
  }, 
});
// export const { toggleReservation } = rockestSlice.actions;
export default dataBaseSlice.reducer;
