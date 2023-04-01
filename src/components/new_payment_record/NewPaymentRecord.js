import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPaymentRecord } from '../../redux/database/databaseReducer';

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
    const response = await dispatch(createPaymentRecord(payloadData));
    if(response.type.includes('fulfilled')){
      navigate(-1);
    }
    else{
      window.alert('The action failed, please try again');
    }
    
  };


  return (
    <div>
        <h1 className='text-start h4 m-4'>Add payment record</h1>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
            <Label for="cost">Amount</Label>
            <Input type="number" name="cost" className='bg-white' id="cost" required value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormGroup>
        <Button color="primary" className='btn-sm' type="submit">Create</Button>
        </Form>
    </div>
   
  );
}

export default NewPaymentRecord;