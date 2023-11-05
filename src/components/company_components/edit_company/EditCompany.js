import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import Reducer from '../../../redux/helpers/reducer';
const {editCompany} = Reducer.asyncThunks

function EditCompany() {
    const {id} = useParams();
    console.log("id : ", id)
    const company = useSelector( state => state.database?.companies?.find( company => company.id === parseInt(id)));

    const [name, setName] = useState(null);

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
      if (company) {
        setName(company?.name);
        // setContactInfo(client?.client_contact_informations[0]?.contact_info);
      }
    },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {
        id: id,
        name: name,
    }
    const response = await dispatch(editCompany(payloadData));
    if(response.type.includes('fulfilled')){
      window.alert('The item was eidted successfully');
      navigate('/home/companies');
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
        <h1 className='text-start h4 m-4'>Edit Company</h1>
      </div>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        
        <Button color="primary" className='btn-sm' type="submit">Edit</Button>
      </Form>
    </div>
  );
}

export default EditCompany;