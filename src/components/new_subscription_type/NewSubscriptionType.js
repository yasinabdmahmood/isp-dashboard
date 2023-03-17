import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSubscriptionType } from '../../redux/database/databaseReducer';

function NewSubscriptionType() {
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [profit, setProfit] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        category,cost,profit
    }
    dispatch(createSubscriptionType(payloadData))
    navigate('/home/subscriptionTypes')
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
    </Form>
  );
}

export default NewSubscriptionType;