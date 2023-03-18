import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../redux/database/databaseReducer';
import { useParams } from 'react-router';

function EditClient() {
    const {id} = useParams();
    const client = useSelector( state => state.database.clients.find( client => client.id === parseInt(id)))
    const [name, setName] = useState(client.name);
    const [useName, setUserName] = useState(client.username);
    const [contactInfo, setContactInfo] = useState(client.client_contact_informations[0].contact_info);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        id: id,
        name: name,
        username: useName,
        contact_info: contactInfo,
    }
    dispatch(createClient(payloadData))
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
      <Button color="primary" type="submit">Edit</Button>
    </Form>
  );
}

export default EditClient;