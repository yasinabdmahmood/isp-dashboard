import React, { useState,useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime';
import { convertToRailsDateTime } from '../../helpers/formatDate';
import 'react-datetime/css/react-datetime.css';
import styles from './styles.module.scss'
import { createSubscriptionRecord, getClients, getSubscriptionTypes } from '../../redux/database/databaseReducer';



function NewSubscriptionRecord() {
    const subscriptionTypes = useSelector( state => state.database.subscriptionTypes);
    const clients = useSelector( state => state.database.clients);
  
    const [client, setClient] = useState(null);
    const [pay, setPay] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [note, setNote] = useState('')

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
      const response = await dispatch(createSubscriptionRecord(payloadData));
      if(response.type.includes('fulfilled')){
        navigate(-1)
      }else{
        window.alert('The action failed, please try again')
      }
       
      
    };

    if (!subscriptionType) {
      return <div>Loading...</div>;
    }
  
  
    return (
      <>
      <h1 className='text-start  h4 m-4'>Create Subscription Record</h1>
      <div className={styles['form-container']} >
      <Form onSubmit={handleSubmit}>
        <FormGroup className='d-flex flex-column'>
            <Label for="client">Client</Label>
            <input type="text" name="client" className={`bg-white ${styles.inputfield}`} id="cleint" placeholder="Type to search" value={client} onChange={(e) => setClient(e.target.value)} list="clients" autocomplete="off"/>
            <datalist id="clients">
                {clients.filter(el => el.name.toLowerCase().includes(client.toLowerCase())).map(el => (
                <option key={el.id} value={el.name}  />
                ))}
            </datalist>
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
            timeFormat="h:mm A"
            closeOnSelect
          />
        </FormGroup>
        <FormGroup>
          <textarea name="note" placeholder='Note' className={`bg-white ${styles.inputfield} w-100`} id="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </FormGroup>
        <Button color="primary" className='btn-sm' type="submit">Create Subscription Record</Button>
      </Form>
      </div>
      
      </>
    );
}

export default NewSubscriptionRecord;