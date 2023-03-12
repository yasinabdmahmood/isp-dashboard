import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/employees/sign_in', {
        employee: {
          email: email,
          password: password
        }
      },{
        withCredentials: true
      });
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Username:</Label>
          <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Login</Button>
      </Form>
    </div>
  </Container>
  );

};

export default LoginForm;
