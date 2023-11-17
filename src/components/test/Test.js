import React, {useState} from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getTestData } from '../../redux/database/databaseReducer';
import Reducer from '../../redux/helpers/reducer';
import { Table } from 'react-bootstrap';
const {getAgents,getCompanies, createCompany, deleteCompany, editCompany, getLedgers} = Reducer.asyncThunks

function Test() {

    const ledgers = useSelector( state => state.database?.ledgers);
    const dispatch = useDispatch();
    const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Alice', age: 25 },
        { id: 3, name: 'Bob', age: 35 },
      ];

    const fetchCompanies = () => {
        const payload = {requested_data: 'company'};
        dispatch(getCompanies())
    }

    const fetchAgents = () => {
        const payload = {requested_data: 'agent'};
        dispatch(getTestData(payload))
    }

    const fetchLedgers = () => {
        const payload = {requested_data: 'ledger'};
        dispatch(getLedgers())
    }


    const createCompanyForm = {
      name: 'text',
    };
    const createNewCompany = (data) => {
      dispatch(createCompany(data))
    }

    const deleteCompanyForm = {id: 'number'}
    const deletecompanyAction = (data) => {
      dispatch(deleteCompany(data))
    }

    const updateCompanyForm = { id: 'number', name: 'text'}
    const updateCompanyAction = (data) => {
      dispatch(editCompany(data))
    }

    

    return (
        <div>
            <h1>This is test page</h1>
            <button onClick={fetchAgents}>Fetch agents</button>
            <button onClick={fetchCompanies}>Fetch companies</button>
            <button onClick={fetchLedgers}>Fetch ledgers</button> 

            <div className='mt-5'>
                
               <MyTable data={ ledgers} />
               <DynamicForm fieldDefinitions={createCompanyForm} onSubmit={createNewCompany} discription={'Create new Company'} />
               <DynamicForm fieldDefinitions={deleteCompanyForm} onSubmit={deletecompanyAction} discription={'delete Company'} />
               <DynamicForm fieldDefinitions={updateCompanyForm} onSubmit={updateCompanyAction} discription={'update Agent'} />
            </div>
        </div>
    );
}


function MyTable({ data }) {
 
    
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the keys (table headers) from the first object in the array
  const headers = Object.keys(data[0]);
  console.log('0000000000000000')
    console.log(headers)
    console.log('0000000000000000')

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>
                {item[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </Table>
  );
}


function DynamicForm({ fieldDefinitions, onSubmit, discription }) {
  const [formData, setFormData] = useState({});
  
  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h4>{discription}</h4>
      <form onSubmit={handleSubmit}>
      {Object.keys(fieldDefinitions).map((fieldName) => {
        const fieldType = fieldDefinitions[fieldName];
        return (
          <div key={fieldName}>
            <label htmlFor={fieldName}>{fieldName}</label>
            {fieldType === 'text' ? (
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              />
            ) : fieldType === 'number' ? (
              <input
                type="number"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              />
            ) : null}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
    </div>
    
  );
}



export default Test;