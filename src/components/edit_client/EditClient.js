import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editClient, createClientContactInfo, deleteClientContactInfo, getClientHistory, getClients } from '../../redux/database/databaseReducer';
import { useParams } from 'react-router';

function EditClient() {
    const {id} = useParams();
    const client = useSelector( state => state.database?.clients?.find( client => client.id === parseInt(id)))
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    
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
    }
    const response = await dispatch(editClient(payloadData));
    if(response.type.includes('fulfilled')){
      navigate('/home/clients');
    }
    else{
      window.alert('The action Failed, please try again');
    }
  };

  
  const addContactInfo = async (event) => {
    event.preventDefault();
    const payloadData = {
        client_id: id,
        contact_info: inputValue,
    }
    await dispatch(createClientContactInfo(payloadData));
    await dispatch(getClients());
    await dispatch(getClientHistory({id}));
    setInputValue('');
  }

  const removeContactInfo = async (id) => {
    const payloadData = {id}
    const confirm = window.confirm('Are you sure you want to delete this item')
    if(confirm){
    await dispatch(deleteClientContactInfo(payloadData));
    }
    else{
        return;
    }
    dispatch(getClients());
    
  }


  if (!name || !userName || !contactInfo) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <div>
        <h1 className='text-start h4 m-4'>Edit Client</h1>
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
        <Button color="primary" className='btn-sm' type="submit">Edit</Button>
      </Form>
      <div>
            <ul>
                <li>
                    <span className='h5'>Contact info: </span>
                    <ul>
                        {client.client_contact_informations.map( cl => {
                            return (
                                <li key={cl.id} className='my-2'>
                                    <span >{cl.contact_info}</span>
                                    <button 
                                    onClick={()=>removeContactInfo(cl.id)}
                                    className='btn btn-sm btn-danger mx-2'
                                    >Remove
                                    </button>
                                </li>
                            )
                        }
                            
                        )}
                    </ul>
                </li>
                <li>
                <form className="form-inline d-flex flex-md-row flex-column" onSubmit={addContactInfo}>
                <div className="">
                    <label htmlFor="inputField" className="h5 m-1">Add contact info</label>
                    <input type="text" className="" id="inputField" placeholder="Enter text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button type="submit" className="btn btn-sm btn-primary mx-1">Add</button>
                </div>
                </form>
                </li>
            </ul>
      </div>
    </div>
  );
}

export default EditClient;