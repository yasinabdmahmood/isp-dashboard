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
  },
  {
    name: 'createAgent',
    url: '/agents/create_agent',
    method: 'get',
    reducer: (state, action) => {
       const newAgent = action.payload.data;
       return {
          ...state,
          agents: [...state.agents, newAgent]
       };
    }
  },

  {
    name: 'destroyAgent',
    url: '/agents/destroy_agent',
    method: 'get',
    reducer: (state, action) => {
       const {agent_id} = action.payload.data;
       return {
          ...state,
          agents: state.agents.filter( (agent) => agent.id !== parseInt(agent_id))
       };
    }
  },

  {
   name: 'updateAgent',
   url: '/agents/update_agent',
   method: 'get',
   reducer: (state, action) => {
      const updatedAgent = action.payload.data;
      return {
         ...state,
         agents: state.agents.map( (agent) => {
            if(updatedAgent.id === parseInt(agent.id)){
               return updatedAgent;
            }else{
               return agent;
            }
         })
      };
   }
 }
  
].map( (item) =>  new Reducer(item) )

