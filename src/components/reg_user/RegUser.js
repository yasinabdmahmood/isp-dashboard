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
      
      console.log('response.data')
      console.log(response.data); // successful registration message
      // redirect or perform other action upon successful registration
    } catch (error) {
      console.log(error.response.data); // error message from server
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
      <FormGroup>
          <Label for="name">N
          ame:</Label>
          <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Sign Up</Button>
      </Form>
    </div>
  </Container>
      
    </div>
  );
}

export default RegUser;
