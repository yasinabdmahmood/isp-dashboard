import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import baseUrl from '../../redux/baseUrl';
import { createSubscriptionType } from '../../redux/database/databaseReducer';

function NewSubscriptionType() {
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [profit, setProfit] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        category,cost,profit
    }
    dispatch(createSubscriptionType(payloadData))
    // try {
    //   const response = await axios.post(baseUrl + '/subscription_types', {
    //     new_subscription_type: {
    //       category: category,
    //       cost: cost,
    //       profit: profit,
    //     },
    //   },{
    //     withCredentials: true
    //   });
    //   if (response.status === 200) {
    //     setMessage('Subscription type created successfully!');
    //   } else {
    //     setMessage('Failed to create subscription type.');
    //   }
    // } catch (error) {
    //   setMessage('Failed to create subscription type.');
    // }
  };


  return (
    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
      <FormGroup>
        <Label for="category">Category</Label>
        <Input type="text" name="category" className='bg-white' id="category" required value={category} onChange={(e) => setCategory(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="cost">Cost</Label>
        <Input type="number" name="cost" className='bg-white' id="cost" required value={cost} onChange={(e) => setCost(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="profit">Profit</Label>
        <Input type="number" name="profit" className='bg-white' id="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Create Subscription Type</Button>
      {message && <p>{message}</p>}
    </Form>
  );
}

export default NewSubscriptionType;