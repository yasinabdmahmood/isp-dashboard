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

export const editEmployee = createAsyncThunk(
  'editEmployee/',
  async (payloadData) => {
    try {
      return axios.post(baseUrl + `/employee/update/${payloadData.id}`,
      {
        employee: {
          name: payloadData.name,
          email: payloadData.email,
          password: payloadData.password,
          password_confirmation: payloadData.password_confirmation,
        }
      },
      {
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
  async (_, { getState }) => {
    const state = getState();
    const offset = state.database.paymentRecordIndex;
    try {
      return axios.get(baseUrl + '/payment_records/index',{
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

export const getPaymentHistory = createAsyncThunk(
  'getPaymentHistory/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/subscription_record/history',
      { 
        params: {
          id: payloadData.id,
        },
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

export const deletePaymentRecord = createAsyncThunk(
  'deletePaymentRecord/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/payment_record/destroy',
      { params: {
        id: payloadData.id,
      },
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

export const getClientHistory = createAsyncThunk(
  'getClientHistory/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/client_history',
      { 
        params: {
          id: payloadData.id,
        },
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
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const createClientContactInfo = createAsyncThunk(
  'createClientContactInfo/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/client_contact_information/create', {
        new_client_contact_information: {
          contact_info: payloadData.contact_info,
          client_id: payloadData.client_id,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const deleteClientContactInfo = createAsyncThunk(
  'deleteClientContactInfo/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + `/client_contact_information/destroy/${payloadData.id}`
      ,{
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
  subscriptionRecordIndex: 0,
  paymentRecordIndex: 0,
  clientHistory: null,
  paymentHistory: null,
};

export const dataBaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    clearClientHistory(state,action) {
      return {
        ...state,
        clientHistory: null,
      }
    },
    filterClientHistory(state,action) {
      return {
        ...state,
        clientHistory: state.clientHistory.filter( el => parseInt(el.id) !== parseInt(action.payload.id) )
      }
    },
    clearPaymentHistory(state,action) {
      return {
        ...state,
        paymentHistory: null,
      }
    },
    filterPaymentHistory(state,action) {
      return {
        ...state,
        paymentHistory: state.paymentHistory.filter( el => parseInt(el.id) !== parseInt(action.payload.id) )
      }
    },
    
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
      const subscriptionRecord= action.payload.data.subscriptionRecord;
      const paymentRecord= action.payload.data.paymentRecord;
      return {
        ...state,
        subscriptionRecords: [subscriptionRecord, ...state.subscriptionRecords],
        paymentRecords: [paymentRecord, ...state.paymentRecords],
      };
    });

    builder.addCase(deleteSubscriptionRecord.fulfilled, (state, action) => {
      const {id} = action.payload.data
      return {
        ...state,
        subscriptionRecords: state.subscriptionRecords.filter( el => el.id !== parseInt(id)),
        paymentRecords: state.paymentRecords.filter(el => el.subscription_record_id !== parseInt(id)),
      }
    });

    builder.addCase(getPaymentRecords.fulfilled, (state, action) => {
      const paymentRecords = action.payload.data;
      const newPaymentRecordIndex = paymentRecords.length === 0? state.paymentRecordIndex:state.paymentRecordIndex+1;
      return {
        ...state,
        paymentRecords: [...state.paymentRecords,...paymentRecords],
        paymentRecordIndex: newPaymentRecordIndex,
      };
    });

    builder.addCase(deletePaymentRecord.fulfilled, (state, action) => {
      const {updated_subscription_record, payment_id} = action.payload.data;
      const paymentRecords = state.paymentRecords.filter( paymentRecord => paymentRecord.id !== parseInt(payment_id) );

      const subscriptionRecords = state.subscriptionRecords.map( subscriptionRecord => {
        if(subscriptionRecord.id === updated_subscription_record.id){
          return updated_subscription_record
        }
        else{
          return subscriptionRecord
        }
      })

      return {
        ...state,
        paymentRecords,
        subscriptionRecords,
      };
    });

    builder.addCase(getPaymentHistory.fulfilled, (state, action) => {
      const paymentHistory = action.payload.data;
      return {
        ...state,
        paymentHistory,
      };
    });

    builder.addCase(createPaymentRecord.fulfilled, (state, action) => {
      const paymentRecord = action.payload.data;
      const updatedSubscriptionRecords = state.subscriptionRecords.map((el)=>{
        if(el.id === paymentRecord.subscription_record.id){
          return {
            ...el,
            pay: parseInt(el.pay) + parseInt(paymentRecord.amount),
          }
        }
        else {
          return el
        }
      })
      return {
        ...state,
        paymentRecords: [paymentRecord,...state.paymentRecords],
        subscriptionRecords: updatedSubscriptionRecords,
      };
    });

    builder.addCase(getClients.fulfilled, (state, action) => {
      const clients = action.payload.data
      return {...state,clients};
    });

    builder.addCase(getClientHistory.fulfilled, (state, action) => {
      const subscriptionRecords = action.payload.data
      return {
        ...state,
        clientHistory: subscriptionRecords,
      }
    });

    builder.addCase(createClient.fulfilled, (state, action) => {
      let {client, contact_info} = action.payload.data;
      client = {...client,client_contact_informations: [{contact_info: [contact_info]}]}
      return {
        ...state,
        clients: [client, ...state.clients],
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
      const client = action.payload.data.client;
      return {
        ...state,
        clients: state.clients.map( el => {
          if(el.id === parseInt(client.id)){
            return client;
          }
          else{
            return el;
          }
        })
      };
    });
  }, 
  
});

export const { clearClientHistory, clearPaymentHistory, filterClientHistory, filterPaymentHistory } = dataBaseSlice.actions;
export default dataBaseSlice.reducer;
