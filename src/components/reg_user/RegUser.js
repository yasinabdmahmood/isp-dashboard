import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

function RegUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {new_employee: { name, email, password,role: 'employee' }};
    try {
      const response = await axios.post('http://localhost:3000/employees', userData,{
        withCredentials: false
      });
      
      // successful registration message
      // redirect or perform other action upon successful registration
      window.alert('Employee succesfully registered');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      window.alert('Failed to register Employee');
    }
  };

  return (
    <div>
      <h1 className='text-center text-primary h2 m-4'>Register User</h1>
      <Container className="d-flex justify-content-center align-items-start vh-100">
      <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
      <FormGroup>
          <Label for="name">Name:</Label>
          <Input type="text" className='bg-white' id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="text" className='bg-white' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input type="password" className='bg-white' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Sign Up</Button>
      </Form>
    </div>
  </Container>
      
    </div>
  );
}

export default RegUser;
