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
 
].map( (item) =>  new Reducer(item) )

