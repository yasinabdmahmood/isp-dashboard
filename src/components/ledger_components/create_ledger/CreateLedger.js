import React, { useEffect, useState, useReducer } from 'react';
import styles from './styles.module.scss';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datetime';

import Reducer from '../../../redux/helpers/reducer';
const {createLedger, getCompanies, getAgents} = Reducer.asyncThunks

function parseDate(dateTimeStr) {
  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return`${year}-${month}-${day}`;
}

function slectedCompaniesReducer(state, action) {
  let newState = null
  switch (action.type) {
    case 'setValue':
      newState =  { ...state, [action.key]: action.value };
      break;
    case 'removeKey': 
      newState = {...state};
      newState = Object.keys(state).reduce((acc, key) => {
        if (key !== action.key) {
          acc[key] = newState[key];
        }
        return acc;
      }, {});
      break;
    case 'addKey':
      if(state.hasOwnProperty(action.key)){
        newState = {...state};
      }else{
        newState = {...state, [action.key]: 0}
      }
      break;
    default:
      newState =  {...state};
  }
  console.log(newState);
  return newState;
}

function CreateLedger() {
    const [agentId, setAgentId] = useState(null);
    const [deposit, setDeposit] = useState(0);
    const [selectedCompanies, customDispatch] = useReducer(slectedCompaniesReducer, {});
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [date, setDate] = useState(new Date());
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const companies = useSelector( state => state.database.companies);
    const agents = useSelector( state => state.database.agents);

    useEffect(()=>{
      if(companies.length === 0){
        dispatch(getCompanies())
      }
      if(agents.length === 0){
        dispatch(getAgents())
      }
    },[dispatch])

    useEffect(() => {
      if(selectedCompany === null && companies.length > 0){
        setSelectedCompany(companies[0]?.id)
      }
      
    },[companies]);

    useEffect(() => {
      if(agentId === null && agents.length > 0){
        setAgentId(agents[0]?.id)
      }
      
    },[companies]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const payloadData = {
       agent_id: parseInt(agentId),
       detail: selectedCompanies,
       date: parseDate(date),
       deposit,
    }
    console.log(payloadData)
    const response = await dispatch(createLedger(payloadData))
    if(response.type.includes('fulfilled')){
      window.alert('The item was created successfully')
      navigate('/home/ledgers')
    }else{
      window.alert('The action failed, please try again')
    }
  };
 
  return (
    <>
    <h2 className='text-start h4 m-4'>Create new Ledger</h2>
    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
    <FormGroup className='d-flex flex-column'>
            <Label for="subscription-type">Agent</Label>
                <select name="subscription-type" className={`bg-white`} id="subscription-type" value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                    {agents.map( agent => {
                        return <option value={agent.id}>{agent.name}</option>
                    })}
                </select>
    </FormGroup>

    <FormGroup>
      <Label for="deposit">deposit</Label>
      <Input type="number" name="deposit" className='bg-white' id="profit"  value={deposit} onChange={(e) => setDeposit(e.target.value)} />
    </FormGroup>

    <FormGroup>
      <Label for="date">Date</Label>
      <DatePicker
            id="date"
            value={date}
            onChange={(value) => setDate(value)}
            inputProps={{

              
              className: `bg-white ${styles.inputfield}`,
              autoComplete: 'off',
              placeholder: 'Enter date',
            }}
            dateFormat="YYYY/MM/DD"
            closeOnSelect
          />
    </FormGroup>

      {Object.keys(selectedCompanies).map((company)=>{
        return (
          <FormGroup>
            <Label for={company}>{company}</Label>
            <Input type="number" name={company} className='bg-white' id="profit"  value={selectedCompanies[company]} onChange={(e) => customDispatch({type:"setValue",value:parseInt(e.target.value),key:company})} />
            <Input type="button" onClick={(e) => {e.preventDefault();customDispatch({ type: "removeKey", key: company })}} name={company} className='bg-danger' id="profit"  value={"Delete"} />
          </FormGroup>
        )
      })}

      <Button color="primary" className='btn-sm' type="submit">Create</Button>
    </Form>
    <Form  onSubmit={(e) => {e.preventDefault();customDispatch({type: "addKey", key: e.target.companyType.value})}} className='d-flex flex-column align-items-center' >
      <FormGroup className='d-flex flex-column'>
              <Label for="subscription-type">Add type</Label>
                  <select name="companyType" className={`bg-white`} id="subscription-type" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                      {companies.map( company => {
                          return <option value={company.name}>{company.name}</option>
                      })}
                  </select>
      </FormGroup>
      <Button color="primary"  className='btn-sm' type="submit">Add new type</Button>
    </Form>
    </>
  );
}

export default CreateLedger;