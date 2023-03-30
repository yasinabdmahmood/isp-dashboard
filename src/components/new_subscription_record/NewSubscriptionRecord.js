import React, { useState,useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSubscriptionRecord, getClients, getPaymentRecords, getSubscriptionTypes } from '../../redux/database/databaseReducer';



function NewSubscriptionRecord() {
    const subscriptionTypes = useSelector( state => state.database.subscriptionTypes);
    const clients = useSelector( state => state.database.clients);
  
    const [client, setClient] = useState(null)
    const [pay, setPay] = useState(null);
    const [subscriptionType, setSubscriptionType] = useState(null)
    
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const payloadData = {
          clientId: clients.find( el => el.name === client).id,
          employeeId: JSON.parse(sessionStorage.getItem('user')).id ,
          subscriptionTypeId: subscriptionType,
          pay: pay,
      }
      const response = await dispatch(createSubscriptionRecord(payloadData));
      if(response.type.includes('fulfilled')){
        await dispatch(getPaymentRecords());
        navigate('/home/subscriptionRecords')
      }else{
        window.alert('The action failed, please try again')
      }
       
      
    };

    if (!subscriptionType) {
      return <div>Loading...</div>;
    }
  
  
    return (
      <>
      <h1 className='text-center text-primary h2 m-4'>Create Subscription Record</h1>
      <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup className='d-flex flex-column'>
            <Label for="client">Client</Label>
            <input type="text" name="client" className='bg-white' id="cleint" placeholder="Type to search" value={client} onChange={(e) => setClient(e.target.value)} list="clients" />
            <datalist id="clients">
                {clients.filter(el => el.name.toLowerCase().includes(client.toLowerCase())).map(el => (
                <option key={el.id} value={el.name}  />
                ))}
            </datalist>
        </FormGroup>
        
        <FormGroup className='d-flex flex-column'>
            <Label for="subscription-type">Subscription Type</Label>
                <select name="subscription-type" className='bg-white' id="subscription-type" value={subscriptionType} onChange={(e) => setSubscriptionType(e.target.value)}>
                    {subscriptionTypes.map( subscriptionType => {
                        return <option value={subscriptionType.id}>{subscriptionType.category}</option>
                    })}
                </select>
        </FormGroup>

        <FormGroup>
          <Label for="paid-amount">Paid amount</Label>
          <Input type="number" name="paid-amount" className='bg-white' id="pay" required value={pay} onChange={(e) => setPay(e.target.value)} />
        </FormGroup>
        <Button color="primary" type="submit">Create Subscription Record</Button>
      </Form>
      </>
    );
}

export default NewSubscriptionRecord;