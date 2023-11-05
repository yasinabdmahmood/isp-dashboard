import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import Reducer from '../../../redux/helpers/reducer';
const {createCompany} = Reducer.asyncThunks

function CreateCompany() {
    const [name, setName] = useState('');
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        name: name,
    }
    const response = await dispatch(createCompany(payloadData))
    if(response.type.includes('fulfilled')){
      window.alert('The item was created successfully')
      navigate('/home/companies')
    }else{
      window.alert('The action failed, please try again')
    }
  };


  return (
    <>
    <h2 className='text-start h4 m-4'>Create new Company</h2>
    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>

      <Button color="primary" className='btn-sm' type="submit">Create</Button>
    </Form>
    </>
  );
}

export default CreateCompany;