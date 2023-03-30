import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClient, getClients } from '../../redux/database/databaseReducer';
import { useParams } from 'react-router';

function EditClient() {
    const {id} = useParams();
    const client = useSelector( state => state.database?.clients?.find( client => client.id === parseInt(id)))
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData() {
        if(client.length === 0){
          await dispatch(getClients());
        }
      }
      fetchData();
    }, [client.length]);

    useEffect(() => {
      if (client) {
        setName(client?.name);
        setUserName(client?.username);
        setContactInfo(client?.client_contact_informations[0].contact_info);
      }
    }, [client]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        id: id,
        name: name,
        username: userName,
        contact_info: contactInfo,
    }
    dispatch(createClient(payloadData))
    navigate('/home/clients')
  };

  if (!name || !userName || !contactInfo) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <div>
        <h1 className='text-center m-4'>Edit Client</h1>
      </div>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="username">User name</Label>
          <Input type="text" name="username" className='bg-white' id="cost" required value={userName} onChange={(e) => setUserName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="contact_info">contact info</Label>
          <Input type="text" name="contact_info" className='bg-white' id="profit" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
        </FormGroup>
        <Button color="primary" type="submit">Edit</Button>
      </Form>
    </div>
  );
}

export default EditClient;