import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../redux/database/databaseReducer';

function NewClient() {
    const [name, setName] = useState('');
    const [useName, setUserName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [info, setInfo] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        name: name,
        username: useName,
        contact_info: contactInfo,
        info: info,
        coordinate: coordinates,
    }
    const response = await dispatch(createClient(payloadData))
    if(response.type.includes('fulfilled')){
      navigate('/home/clients')
    }else{
      window.alert('The action failed, please try again')
    }
  };


  return (
    <>
    <h2 className='text-start h4 m-4'>Create new user</h2>
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
      <FormGroup>
        <Label for="Info">Info</Label>
        <Input type="textarea" name="info" className='bg-white' id="profit" required value={info} onChange={(e) => setInfo(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="coordinates">Coordinates</Label>
        <Input type="text" name="coordinates" className='bg-white' id="coordinates"  title="Please enter the coordinates in the format: (latitude, longitude)" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} />
      </FormGroup>
      <Button color="primary" className='btn-sm' type="submit">Create</Button>
    </Form>
    </>
  );
}

export default NewClient;