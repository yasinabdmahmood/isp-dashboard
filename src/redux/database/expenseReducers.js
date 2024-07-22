import Reducer from "../helpers/reducer";

export default [
  {
    name: 'getExpenses',
    url: '/expenses/get_expenses',
    method: 'get',
    reducer: (state, action) => {
       const expenses = action.payload.data;
       return {
          ...state,
          expenses: [...state.expenses,...expenses],
          expenseIndex: state.expenseIndex + 1
       };
    }
  },
  {
    name: 'getAccountOptions',
    url: '/expenses/get_account_options',
    method: 'get',
    reducer: (state, action) => {
       const accountOptions = action.payload.data;
       return {
          ...state,
          accountOptions,
       };
    }
  },
  {
   name: 'createExpense',
   url: '/expenses/create_expense',
   method: 'get',
   reducer: (state, action) => {
      const newExpense = action.payload.data;
      return {
         ...state,
         expenses: [newExpense, ...state.expenses]
      };
   }
 },
 
].map( (item) =>  new Reducer(item) )

