import React, { useState,useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime';
import { convertToRailsDateTime } from '../../helpers/formatDate';
import 'react-datetime/css/react-datetime.css';
import styles from './styles.module.scss'
import { createSubscriptionRecord, getClients, getSubscriptionTypes } from '../../redux/database/databaseReducer';


const getSuggestions = (value, clients) => {
  const filterClient = (cl) => {
    // check if the client name is within the searched text
    const con1 = cl.name.toLowerCase().includes(value.toLowerCase());

    // check if the client username is within the searched text
    const con2 = cl.username.toLowerCase().includes(value.toLowerCase());

    // check if the client phone numbers is within the searched text
    const con3 = cl.client_contact_informations.some(el => el.contact_info.includes(value.toLowerCase()));
    if( con1 || con2 || con3 ) return true;
    return false;
  }
  return clients.filter(el => filterClient(el))
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
<div>
  <p>{suggestion.name}</p>
  <p>{suggestion.username}</p>
  {suggestion.client_contact_informations.map( el => (
  <p>{el.contact_info}</p>
  ))}
  <hr/>
  
</div>
);


function NewSubscriptionRecord() {
    const subscriptionTypes = useSelector( state => state.database.subscriptionTypes);
    const clients = useSelector( state => state.database.clients);
  
    const [client, setClient] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [pay, setPay] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (event, { newValue }) => {
      setClient(newValue);
    };
  
    const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value, clients));
    };
  
    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    const inputProps = {
      placeholder: 'Enter client',
      value: client,
      onChange,
    };

    useEffect(() => {
      async function fetchData() {
        if(subscriptionTypes.length === 0){
          await dispatch(getClients());
        }
        if(clients.length === 0){
          await dispatch(getSubscriptionTypes());
        }
      }
      fetchData();
    }, [clients.length, subscriptionTypes.length]);

    useEffect(() => {
      if (subscriptionTypes) {
        setSubscriptionType(subscriptionTypes[0]?.id);
        setClient('');
        setPay('');
      }
    }, [subscriptionTypes]);
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      if(loading){
        return;
      }
      const clientId = clients.find( el => el.name === client)?.id
      if(!clientId){
        window.alert('This user does not exist')
        return;
      }
      const payloadData = {
          clientId: clientId,
          employeeId: JSON.parse(sessionStorage.getItem('user')).id ,
          subscriptionTypeId: subscriptionType,
          pay: pay,
          note: note,
          created_at: convertToRailsDateTime(dateTime),
      }
      setLoading(true);
      const response = await dispatch(createSubscriptionRecord(payloadData));
      if(response.type.includes('fulfilled')){
        navigate(-1)
      }else{
        window.alert('The action failed, please try again')
      }
      setLoading(false); 
      
    };

    if (!subscriptionType) {
      return <div>Loading...</div>;
    }

    const filterClient = (cl) => {
      // check if the client name is within the searched text
      const con1 = cl.name.toLowerCase().includes(client.toLowerCase());

      // check if the client username is within the searched text
      const con2 = cl.username.toLowerCase().includes(client.toLowerCase());

      // check if the client phone numbers is within the searched text
      const con3 = cl.client_contact_informations.some(el => el.contact_info.includes(client.toLowerCase()));
      if( con1 || con2 || con3 ) return true;
      return false;
    }

  
  
    return (
      <>
      <h1 className='text-start  h4 m-4'>Create Subscription Record</h1>
      <div className={styles['form-container']} >
      <Form onSubmit={handleSubmit}>
        <FormGroup className='d-flex flex-column'>
            <Label for="client">Client</Label>
            {/* <input type="text" name="client" className={`bg-white ${styles.inputfield}`} id="cleint" placeholder="Type to search" value={client} onChange={(e) => setClient(e.target.value)} list="clients" autocomplete="off"/>
            <datalist id="clients">
                {clients.filter(el => filterClient(el)).map(el => (
                <option key={el.id} value={el.name} >
                  <p>{el.username +' , '+ el.client_contact_informations.reduce((acc, curr) => acc + ' , ' + curr?.contact_info, '').substring(3)}</p>
                </option>
                ))}
            </datalist> */}
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
        </FormGroup>
        
        <FormGroup className='d-flex flex-column'>
            <Label for="subscription-type">Subscription Type</Label>
                <select name="subscription-type" className={`bg-white ${styles.inputfield}`} id="subscription-type" value={subscriptionType} onChange={(e) => setSubscriptionType(e.target.value)}>
                    {subscriptionTypes.map( subscriptionType => {
                        return <option value={subscriptionType.id}>{subscriptionType.category}</option>
                    })}
                </select>
        </FormGroup>

        <FormGroup>
          <Label for="paid-amount">Paid amount</Label>
          <Input type="number" name="paid-amount" className={`bg-white ${styles.inputfield}`} id="pay" required value={pay} onChange={(e) => setPay(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="datetime">Date and Time</Label>
          <DateTimePicker
            id="datetime"
            value={dateTime}
            onChange={(value) => setDateTime(value)}
            inputProps={{
              
              className: `bg-white ${styles.inputfield}`,
              autoComplete: 'off',
              placeholder: 'Enter date and time',
            }}
            dateFormat="YYYY/MM/DD"
            timeFormat="HH:mm"
            closeOnSelect
          />
        </FormGroup>
        <FormGroup>
          <textarea name="note" placeholder='Note' className={`bg-white ${styles.inputfield} w-100`} id="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </FormGroup>
        <Button color="primary" className='btn-sm' style={{cursor: loading? 'wait':'pointer'}} type="submit">Create Subscription Record</Button>
      </Form>
      </div>
      
      </>
    );
}

export default NewSubscriptionRecord;