import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInCredentials } from '../../redux/login/loginReducer';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'
// import axios from 'axios';

const LoginForm = () => {
  const loggedInEmployee = useSelector(state => state.login);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInEmployee) {
      navigate('/home');
    }
  }, [loggedInEmployee, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {email,password}
    dispatch(getLoggedInCredentials(payloadData))
    // try {
    //   const response = await axios.post('http://localhost:3000/employees/sign_in', {
    //     employee: {
    //       email: email,
    //       password: password
    //     }
    //   },{
    //     withCredentials: true
    //   });
    //   console.log(response.data);
    //   navigate('/home');
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <div className={styles.container}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email" className='text-white'>Username:</Label>
          <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password" className='text-white'>Password:</Label>
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Login</Button>
      </Form>
    </div>
  </Container>
    </div>
    
  );

};

export default LoginForm;
