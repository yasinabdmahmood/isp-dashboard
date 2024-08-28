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
            expenses: [...state.expenses, ...expenses],
            expenseIndex: state.expenseIndex + 1
         };
      }
   },
   {
      name: 'getPendingExpenses',
      url: '/expenses/get_pending_expenses',
      method: 'get',
      reducer: (state, action) => {
         const expenses = action.payload.data;
         return {
            ...state,
            pendingExpenses: [...state.pendingExpenses, ...expenses],
            pendingExpenseIndex: state.pendingExpenseIndex + 1
         };
      }
   },
   {
      name: 'getSearchedExpenses',
      url: '/expenses/get_searched_expenses',
      method: 'get',
      reducer: (state, action) => {
         const expenses = action.payload.data;
         return {
            ...state,
            searchedExpenses: expenses,
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
      name: 'createAccountOptions',
      url: '/expenses/create_account_options',
      method: 'get',
      reducer: (state, action) => {
         const accountOption = action.payload.data;
         return {
            ...state,
            accountOptions: [...state.accountOptions,accountOption],
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
            expenses: [newExpense, ...state.expenses],
            pendingExpenses: [newExpense, ...state.pendingExpenses]
         };
      }
   },
   {
      name: 'updateExpenseStatus',
      url: '/expenses/update_expense_status',
      method: 'get',
      reducer: (state, action) => {
         const updatedExpense = action.payload.data;
         return {
            ...state,
            expenses: state.expenses.map((el) => {
               if (el.id == updatedExpense.id) {
                  return updatedExpense;
               } else {
                  return el
               }
            }),
            pendingExpenses: state.pendingExpenses.filter((el) => {
                return el.id != updatedExpense.id
            })
         };
      }
   },

].map((item) => new Reducer(item))

