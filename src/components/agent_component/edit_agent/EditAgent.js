import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClientContactInfo, deleteClientContactInfo, getClientHistory, getClients } from '../../../redux/database/databaseReducer';
import { useParams } from 'react-router';

import Reducer from '../../../redux/helpers/reducer';
const {editAgent} = Reducer.asyncThunks

function EditAgent() {
    const {id} = useParams();
    const agent = useSelector( state => state.database?.agents?.find( agent => agent.id === parseInt(id)));

    const [name, setName] = useState(null);
    const [info, setInfo] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // to be checked
    // useEffect(() => {
    //   async function fetchData() {
    //     if(client?.length === 0){
    //       await dispatch(getClients());
    //     }
    //   }
    //   fetchData();
    // }, [client?.length]);

    useEffect(() => {
      if (agent) {
        setName(agent?.name);
        // setContactInfo(client?.client_contact_informations[0]?.contact_info);
        setInfo(agent?.info);
      }
    },[agent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        id: id,
        name: name,
        info: info,
    }
    const response = await dispatch(editAgent(payloadData));
    if(response.type.includes('fulfilled')){
      window.alert('The item was created successfully');
      navigate('/home/agents');
    }
    else{
      window.alert('The action Failed, please try again');
    }
  };

  if (!name) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <div>
        <h1 className='text-start h4 m-4'>Edit Agent</h1>
      </div>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        
        <FormGroup>
          <Label for="info">Info</Label>
          <Input type="textarea" name="info" className='bg-white' id="info"  value={info} onChange={(e) => setInfo(e.target.value)} />
        </FormGroup>
        <Button color="primary" className='btn-sm' type="submit">Edit</Button>
      </Form>
    </div>
  );
}

export default EditAgent;