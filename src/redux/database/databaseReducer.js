import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../baseUrl';
import reducers from './agentReducers';



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
          role: payloadData.role,
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

export const getFilteredSubscriptionRecords = createAsyncThunk(
  'getFilteredSubscriptionRecords/',
  async (payloadData) => {
   
    try {
      return axios.get(baseUrl + '/filtered_subscription_records', {
        params: {
          date: {
            start: payloadData.start,
            end: payloadData.end,
          },
          filter: payloadData.filter,
        },
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const getUnpaidSubscriptionRecords = createAsyncThunk(
  'getUnpaidSubscriptionRecords/',
  async () => {
   
    try {
      return axios.get(baseUrl + '/unpaid_subscription_records', {
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
          note: payloadData.note,
          created_at: payloadData.created_at,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const editSubscriptionRecord = createAsyncThunk(
  'editSubscriptionRecord/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/subscription_record/update/' + payloadData.id, {
        updated_subscription_record: {
          client_id: payloadData.clientId,
          assigned_employee: payloadData.assignedEmployee,
          note: payloadData.note,
          created_at: payloadData.created_at,
        },
      },{
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const assignedEmployees = createAsyncThunk(
  'assignedEmployees/',
  async (payloadData) => {
    try {
      return  axios.post(baseUrl + '/subscription_record/assign_employees', {
        assign_employees: {
          employee: payloadData.employee,
          subscriptionIds: payloadData.subscriptionIds,
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
          created_at: payloadData.created_at,
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
          info: payloadData.info,
          coordinate: payloadData.coordinate,
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
          coordinate: payloadData.coordinate,
          info: payloadData.info,
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

export const getActivities = createAsyncThunk(
  'getActivities/',
  async (_, { getState }) => {
    const state = getState();
    const offset = state.database.activityIndex;
    try {
      return axios.get(baseUrl + '/activities/index',{
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

export const getDailyReport = createAsyncThunk(
  'getDailyReport/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/reports/get_daily_report',
      { params: {
          date: {
            day: payloadData.day,
            month: payloadData.month,
            year: payloadData.year,
          }
        },
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const getMonthlyReport = createAsyncThunk(
  'getMonthlyReport/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/reports/get_monthly_report',
      { params: {
          date: {
            month: payloadData.month,
            year: payloadData.year,
          }
        },
        withCredentials: true
      });
    } catch (error) {
      return error;
    }
  },
);

export const getTestData = createAsyncThunk(
  'getTestData/',
  async (payloadData) => {
    try {
      return  axios.get(baseUrl + '/test',
      { params: payloadData,
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
  filteredSubscriptionRecords: [],
  unpaidSubscriptionRecords: [],
  paymentRecords: [],
  activities: [],
  subscriptionRecordIndex: 0,
  paymentRecordIndex: 0,
  activityIndex: 0,
  clientHistory: null,
  paymentHistory: null,
  dailyReport: null,
  monthlyReport: null,
  agents: [],
  test: null,
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

  },
  extraReducers: (builder) => {

    reducers.forEach((item)=>{
      builder.addCase(item.asyncThunk.fulfilled,item.reducer)
    })
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

    builder.addCase(getFilteredSubscriptionRecords.fulfilled, (state, action) => {
      const subscriptionRecords = action.payload.data;
      return {
        ...state,
        filteredSubscriptionRecords: subscriptionRecords,
      };
    });

    builder.addCase(getUnpaidSubscriptionRecords.fulfilled, (state, action) => {
      const subscriptionRecords = action.payload.data;
      return {
        ...state,
        unpaidSubscriptionRecords: subscriptionRecords,
      };
    });

    builder.addCase(createSubscriptionRecord.fulfilled, (state, action) => {
      const subscriptionRecord= action.payload.data.subscriptionRecord;
      const paymentRecord= action.payload.data.paymentRecord;
      let unpaidSubscriptionRecords = [...state.unpaidSubscriptionRecords];

      // subscriptionRecords: [],
      // unpaidSubscriptionRecords: [],
      // clientHistory: null,

      // if the newly created subscription record is not fully paid then add the record to 
      // the unpaid subscription records list inside redux store
      if(subscriptionRecord.pay < subscriptionRecord.cost){
        unpaidSubscriptionRecords = [subscriptionRecord, ...unpaidSubscriptionRecords]
      }


      // let clientHistory = [...state.clientHistory] || [];
      // // if the newly created subscription record belongs to cleint history then add the record to 
      // // the client history subscription records list inside redux store
      // if(subscriptionRecord.client_id === clientHistory[0]?.client_id){
      //   clientHistory = [subscriptionRecord, ...clientHistory]
      // }
     
      
      return {
        ...state,
        subscriptionRecords: [subscriptionRecord, ...state.subscriptionRecords],
        unpaidSubscriptionRecords: unpaidSubscriptionRecords,
        paymentRecords: [paymentRecord, ...state.paymentRecords],
      };
    });

    builder.addCase(editSubscriptionRecord.fulfilled, (state, action) => {
      const subscriptionRecord= action.payload.data;

      // subscriptionRecords: [],
      // unpaidSubscriptionRecords: [],
      // clientHistory: null,

      //update subscriptionRecords list
      const updatedSubscriptionList = state.subscriptionRecords.map((sb)=>{
        if(sb.id === subscriptionRecord.id){
          return subscriptionRecord
        }else {
          return sb
        }
      })

      // update unpaidSubscriptionRecords list
      const updatedUnpaidSubscriptionRecordList = state.unpaidSubscriptionRecords.map((sb)=> {
        if(sb.id === subscriptionRecord.id){
          return subscriptionRecord
        }else {
          return sb
        }
      })

      return {
        ...state,
        subscriptionRecords: updatedSubscriptionList,
        unpaidSubscriptionRecords: updatedUnpaidSubscriptionRecordList,
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
      let client = action.payload.data;
      
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

    builder.addCase(getActivities.fulfilled, (state, action) => {
      const activities = action.payload.data;
      const newActivityIndex = activities.length === 0? state.activityIndex:state.activityIndex+1;
      return {
        ...state,
        activities: [...state.activities,...activities],
        activityIndex: newActivityIndex,
      };
    });

    builder.addCase(getDailyReport.fulfilled, (state, action) => {
      const dailyReport = action.payload.data;
      return {
        ...state,
        dailyReport,
      };
    });

    builder.addCase(getMonthlyReport.fulfilled, (state, action) => {
      const monthlyReport = action.payload.data;
      return {
        ...state,
        monthlyReport,
      };
    });

    builder.addCase(getTestData.fulfilled, (state, action) => {
      const test = action.payload.data;
      return {
        ...state,
        test,
      };
    });
  }, 
  
});

export const { clearClientHistory, clearPaymentHistory, filterClientHistory, filterPaymentHistory } = dataBaseSlice.actions;
export default dataBaseSlice.reducer;
