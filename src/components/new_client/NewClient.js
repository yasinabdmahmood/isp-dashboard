import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../redux/database/databaseReducer';

function NewClient() {
    const [name, setName] = useState('');
    const [useName, setUserName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        name: name,
        username: useName,
        contact_info: contactInfo,
    }
    await dispatch(createClient(payloadData))
    navigate('/home/clients')
  };


  return (
    <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="username">User name</Label>
        <Input type="text" name="username" className='bg-white' id="cost" required value={useName} onChange={(e) => setUserName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="contact_info">contact info</Label>
        <Input type="text" name="contact_info" className='bg-white' id="profit" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Create</Button>
    </Form>
  );
}

export default NewClient;