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

//   {
//     name: 'deleteAgent',
//     url: '/agents/destroy_agent',
//     method: 'get',
//     reducer: (state, action) => {
//        const {agent_id} = action.payload.data;
//        return {
//           ...state,
//           agents: state.agents.filter( (agent) => agent.id !== parseInt(agent_id))
//        };
//     }
//   },

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

