import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editEmployee, editSubscriptionType, getClients, getEmployees, getSubscriptionTypes} from '../../redux/database/databaseReducer';
import { useParams } from "react-router-dom";

function EditEmployee() {
    const { id } = useParams();
    const employee = useSelector(state => state.database.employees.find(employee => employee.id === parseInt(id)));
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchData() {
        if(!employee){
          await dispatch(getEmployees());
        }
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      if (employee) {
        setName(employee.name);
        setEmail(employee.email);
      }
    }, []);
  
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const payloadData = {
          id: id,
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        };
          const response = await dispatch(editEmployee(payloadData));
          if(response.type === 'editEmployee//fulfilled'){
            await dispatch(getEmployees());
            navigate(`/home/profile/${id}`);
          }else {
            alert('Error editing employee. Please try again.');
          }
      };
      
    
    if (!employee) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2 className='text-center m-4'>Edit Employee</h2>
        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" className='bg-white' id="category" required value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" className='bg-white' id="cost" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" className='bg-white' id="profit" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password-confirmation">Password Confirmation</Label>
          <Input type="password" name="password-confirmation" className='bg-white' id="profit" required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </FormGroup>
        <Button color="primary" type="submit">Update Employee information</Button>
      </Form>
      </div>
      
    );
}

export default EditEmployee;