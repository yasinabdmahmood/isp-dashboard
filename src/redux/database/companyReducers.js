import Reducer from "../helpers/reducer";

export default [
  {
    name: 'getCompanies',
    url: '/comanies/get_comanies',
    method: 'get',
    reducer: (state, action) => {
       const companies = action.payload.data;
       return {
          ...state,
          companies,
       };
    }
  },
  {
    name: 'createCompany',
    url: '/comanies/create_company',
    method: 'get',
    reducer: (state, action) => {
       const newCompany = action.payload.data;
       return {
          ...state,
          companies: [...state.companies, newCompany]
       };
    }
  },

  {
    name: 'deleteCompany',
    url: '/companies/destroy_company',
    method: 'get',
    reducer: (state, action) => {
       const {company_id} = action.payload.data;
       return {
          ...state,
          companies: state.companies.filter( (comany) => comany.id !== parseInt(company_id))
       };
    }
  },

  {
   name: 'editCompany',
   url: '/companies/update_company',
   method: 'get',
   reducer: (state, action) => {
      const updatedCompany = action.payload.data;
      return {
         ...state,
         companies: state.companies.map( (company) => {
            if(updatedCompany.id === parseInt(company.id)){
               return updatedCompany;
            }else{
               return company;
            }
         })
      };
   }
 }
  
].map( (item) =>  new Reducer(item) )

