import React from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getTestData } from '../../redux/database/databaseReducer';
import Reducer from '../../redux/helpers/reducer';
import { Table } from 'react-bootstrap';
const {getAgents} = Reducer.asyncThunks

function Test() {

    const testData = useSelector( state => state.database?.test);
    const dispatch = useDispatch();
    const data = [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Alice', age: 25 },
        { id: 3, name: 'Bob', age: 35 },
      ];

    const fetchCompanies = () => {
        const payload = {requested_data: 'company'};
        dispatch(getTestData(payload))
    }

    const fetchAgents = () => {
        const payload = {requested_data: 'agent'};
        dispatch(getTestData(payload))
    }

    const fetchLedgers = () => {
        const payload = {requested_data: 'ledger'};
        dispatch(getTestData(payload))
    }
    return (
        <div>
            <h1>This is test page</h1>
            <button onClick={fetchAgents}>Fetch agents</button>
            <button onClick={fetchCompanies}>Fetch companies</button>
            <button onClick={fetchLedgers}>Fetch ledgers</button> 

            <div className='mt-5'>
                
               <MyTable data={ testData} />
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




export default Test;