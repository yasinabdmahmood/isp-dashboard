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

export const createEmployeeContactInfo = createAsyncThunk(
  'createEmployeeContactInfo/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/employee_contact_information/create', {
        new_employee_contact_information: {
          contact_info: payloadData.contact_info,
          employee_id: payloadData.employee_id,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const deleteEmployeeContactInfo = createAsyncThunk(
  'deleteEmployeeContactInfo/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + `/employee_contact_information/destroy/${payloadData.id}`
      ,{
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
  async (_, { getState }) => {
    const state = getState();
    const offset = state.database.subscriptionRecordIndex;
    try {
      return axios.get(baseUrl + '/subscription_records', {
        params: {
          offset: offset,
        },
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const createSubscriptionRecord = createAsyncThunk(
  'createSubscriptionRecord/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/subscription_record/create', {
        new_subscription_record: {
          pay: payloadData.pay,
          client_id: payloadData.clientId,
          subscription_type_id: payloadData.subscriptionTypeId,
          employee_id: payloadData.employeeId,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const deleteSubscriptionRecord = createAsyncThunk(
  'deleteSubscriptionRecord/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/subscription_record/delete/' + payloadData.id,{
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

export const createPaymentRecord = createAsyncThunk(
  'createPaymentRecord/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/payment_record/create/' + payloadData.subscription_record_id, {
        new_payment_record: {
          amount: payloadData.amount,
          subscription_record_id: payloadData.subscription_record_id,
        },
      },{
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


export const createClient = createAsyncThunk(
  'createClient/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/client/create', {
        new_client: {
          name: payloadData.name,
          username: payloadData.username,
          contact_info: payloadData.contact_info,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const deleteClient = createAsyncThunk(
  'deleteClient/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/client/delete/' + payloadData,{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const editClient = createAsyncThunk(
  'editClient/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/client/update/' + payloadData.id, {
        updated_client: {
          name: payloadData.name,
          username: payloadData.username,
          contact_info: payloadData.contact_info,
        },
      },{
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

export const editSubscriptionType = createAsyncThunk(
  'editSubscriptionType/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/subscription_types/update/' + payloadData.id, {
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

export const deleteSubscriptionType = createAsyncThunk(
  'deleteSubscriptionType/',
  async (payloadData) => {
    try {
      return  axios.delete(baseUrl + '/subscription_types/' + payloadData,
      {
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  employees: [],
  subscriptionTypes: [],
  clients: [],
  subscriptionRecords: [],
  paymentRecords: [],
  subscriptionRecordIndex: 0
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

    builder.addCase(editSubscriptionType.fulfilled, (state, action) => {
      const subscriptionType = action.payload.data.subscription_type
      console.log('subscriptionType')
      console.log(action.payload.data)
      return {
        ...state,
        subscriptionTypes: state.subscriptionTypes.map( el => {
          if(el.id === parseInt(subscriptionType.id)){
            return subscriptionType
          }
          else{
            return el
          }
        })
      };
    });

    builder.addCase(deleteSubscriptionType.fulfilled, (state, action) => {
      const id = action.payload.data.subscription_type_id;
      return {
        ...state,
        subscriptionTypes: state.subscriptionTypes.filter( subscriptionType => subscriptionType.id !== parseInt(id))
      }
    });


    builder.addCase(getSubscriptionRecords.fulfilled, (state, action) => {
      const subscriptionRecords = action.payload.data;
      const newSubscriptionRecordIndex = subscriptionRecords.length === 0? state.subscriptionRecordIndex:state.subscriptionRecordIndex+1;
      return {
        ...state,
        subscriptionRecords: [...state.subscriptionRecords,...subscriptionRecords],
        subscriptionRecordIndex: newSubscriptionRecordIndex,
      };
    });

    builder.addCase(createSubscriptionRecord.fulfilled, (state, action) => {
      let {subscriptionRecord, client, employee, subscriptionType} = action.payload.data;
      console.log('subscriptionRecord')
      console.log(action.payload.data.subscriptionRecord)
      subscriptionRecord.client = client;
      subscriptionRecord.employee = employee;
      subscriptionRecord.subscription_type = subscriptionType;
      
      return {
        ...state,
        subscriptionRecords: [subscriptionRecord, ...state.subscriptionRecords]
      };
    });

    builder.addCase(deleteSubscriptionRecord.fulfilled, (state, action) => {
      const {id} = action.payload.data
      console.log('id')
      console.log(action.payload.data)
      return {
        ...state,
        subscriptionRecords: state.subscriptionRecords.filter( el => el.id !== parseInt(id))
      }
    });


    builder.addCase(getPaymentRecords.fulfilled, (state, action) => {
      const paymentRecords = action.payload.data
      return {...state,paymentRecords};
    });

    builder.addCase(createPaymentRecord.fulfilled, (state, action) => {
      return state;
    });

    builder.addCase(getClients.fulfilled, (state, action) => {
      const clients = action.payload.data
      return {...state,clients};
    });

    builder.addCase(createClient.fulfilled, (state, action) => {
      let {client, contact_info} = action.payload.data;
      client = {...client,client_contact_informations: [{contact_info: [contact_info]}]}
      return {
        ...state,
        clients: [...state.clients, client],
      };
    });

    builder.addCase(deleteClient.fulfilled, (state, action) => {
      const id = action.payload.data.client_id;
      return {
        ...state,
        clients: state.clients.filter( client => client.id !== parseInt(id))
      }
    })

    builder.addCase(editClient.fulfilled, (state, action) => {
      const {client, contact_info} = action.payload.data.client
      return {
        ...state,
        clients: state.clients.map( el => {
          if(el.id === parseInt(client.id)){
            return {...client,client_contact_informations: [{contact_info: [contact_info]}]}
          }
          else{
            return el
          }
        })
      };
    });
  }, 
  
});

// export const { toggleReservation } = rockestSlice.actions;
export default dataBaseSlice.reducer;
