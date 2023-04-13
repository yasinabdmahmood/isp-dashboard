import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createPaymentRecord } from '../../redux/database/databaseReducer';
import { convertToRailsDateTime } from '../../helpers/formatDate';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


function NewPaymentRecord() {
  const {id} = useParams();
  const [amount, setAmount] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        amount: amount,
        subscription_record_id: id,
        created_at: convertToRailsDateTime(dateTime),
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
        <FormGroup>
          <Label for="datetime">Date and Time</Label>
          <DateTimePicker
            id="datetime"
            value={dateTime}
            onChange={(value) => setDateTime(value)}
            inputProps={{
              className: `bg-white`,
              autoComplete: 'off',
              placeholder: 'Enter date and time',
            }}
            dateFormat="YYYY/MM/DD"
            timeFormat="h:mm A"
            closeOnSelect
          />
        </FormGroup>

        <Button color="primary" className='btn-sm' type="submit">Create</Button>
        </Form>
    </div>
   
  );
}

export default NewPaymentRecord;