import Reducer from "../helpers/reducer";

export default [
  {
    name: 'getLedgers',
    url: '/ledgers/get_ledgers',
    method: 'get',
    reducer: (state, action) => {
       const ledgers = action.payload.data;
       return {
          ...state,
          ledgers,
       };
    }
  },
  {
    name: 'createLedger',
    url: '/ledgers/create_ledger',
    method: 'get',
    reducer: (state, action) => {
       const newLedger = action.payload.data;
       return {
          ...state,
          ledgers: [...state.ledgers, newLedger]
       };
    }
  },

  {
    name: 'deleteLedger',
    url: '/ledgers/destroy_ledger',
    method: 'get',
    reducer: (state, action) => {
       const {ledger_id} = action.payload.data;
       return {
          ...state,
          ledgers: state.ledgers.filter( (ledger) => ledger.id !== parseInt(ledger_id))
       };
    }
  },
  {
   name: 'addToDeposit',
   url: '/ledgers/add_to_deposit',
   method: 'get',
   reducer: (state, action) => {
      const updatedLedger = action.payload.data;
      return {
         ...state,
         ledgers: state.ledgers.map( (ledger) => {
              return ledger.id === updatedLedger.id? updatedLedger : ledger;
         })
      };
   }
 },

//   {
//    name: 'editAgent',
//    url: '/agents/update_agent',
//    method: 'get',
//    reducer: (state, action) => {
//       const updatedAgent = action.payload.data;
//       return {
//          ...state,
//          agents: state.agents.map( (agent) => {
//             if(updatedAgent.id === parseInt(agent.id)){
//                return updatedAgent;
//             }else{
//                return agent;
//             }
//          })
//       };
//    }
//  }
  
].map( (item) =>  new Reducer(item) )

