import Reducer from "../helpers/reducer";

export default [
  {
    name: 'getAgents',
    url: '/agents/get_agents',
    method: 'get',
    reducer: (state, action) => {
       const agents = action.payload.data;
       return {
          ...state,
          agents,
       };
    }
  }
  
].map( (item) =>  new Reducer(item) )

