import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createPaymentRecord } from '../../../redux/database/databaseReducer';
import { convertToRailsDateTime } from '../../../helpers/formatDate';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import Reducer from '../../../redux/helpers/reducer';
const {addToDeposit} = Reducer.asyncThunks


function AddDeposit() {
  const location = useLocation();
  const ledger = location.state?.ledger;
  const [amount, setAmount] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(loading){
      return ;
    }
    const payloadData = {
        deposit: amount,
        id: ledger.id,
    }
    setLoading(true)
    const response = await dispatch(addToDeposit(payloadData));
    if(response.type.includes('fulfilled')){
      navigate(-1);
    }
    else{
      window.alert('The action failed, please try again');
    }
    setLoading(false);
    
  };


  return (
    <div>
        <h1 className='text-start h4 m-4'>Add deposit</h1>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
            <Label for="cost">Amount</Label>
            <Input type="number" name="cost" className='bg-white' id="cost" required value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormGroup>
        
        <Button color="primary" style={{cursor: loading? 'wait' : 'pointer'}} className='btn-sm' type="submit">Create</Button>
        </Form>
    </div>
   
  );
}

export default AddDeposit;