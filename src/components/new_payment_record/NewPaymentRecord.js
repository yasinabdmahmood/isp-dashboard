import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPaymentRecord, getPaymentRecords, getSubscriptionRecords } from '../../redux/database/databaseReducer';

function NewPaymentRecord() {
  const {id} = useParams();
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        amount: amount,
        subscription_record_id: id,
    }
    await dispatch(createPaymentRecord(payloadData))
    navigate(-1);
  };


  return (
    <div>
        <h1>Create payment record</h1>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
            <Label for="cost">Amount</Label>
            <Input type="number" name="cost" className='bg-white' id="cost" required value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormGroup>
        <Button color="primary" type="submit">Create</Button>
        </Form>
    </div>
   
  );
}

export default NewPaymentRecord;