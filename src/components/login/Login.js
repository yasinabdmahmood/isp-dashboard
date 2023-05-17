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

  // useEffect(() => {
  //   if (loggedInEmployee) {
  //     const loggedInEmployeeRole = JSON.parse(sessionStorage.getItem('user')).role;
  //     console.log(loggedInEmployeeRole)
  //     if(loggedInEmployeeRole !== 'admin'){
  //       console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxemployee')
  //       navigate('/home/subscriptionRecords')
  //     }else{
  //       console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxadmin')
  //       navigate('/home')
  //     }
  //   }
  // }, [loggedInEmployee]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payloadData = {email, password};
      const responce = await dispatch(getLoggedInCredentials(payloadData));
      if(responce.type.includes('fulfilled')){
        console.log('cccccccccccccccc')
        console.log(JSON.parse(sessionStorage.getItem('user')))
        const loggedInEmployeeRole = JSON.parse(sessionStorage.getItem('user')).role;
        if(loggedInEmployeeRole !== 'admin'){
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxemployee')
          navigate('/home/subscriptionRecords')
        }else{
          console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxadmin')
          navigate('/home')
        }
      }
   
  }

  return (
    <div className={styles.container}>
      <h1 className='text-center pt-5'>Login</h1>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        
    <div className="col-md-6">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email" className='text-black h3 font-weight-bold'>Email:</Label>
          <Input type="text" className='bg-white' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password" className='text-black h3 font-weight-bold'>Password:</Label>
          <Input type="password" className='bg-white' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" color="primary">Login</Button>
      </Form>
    </div>
  </Container>
    </div>
    
  );

};

export default LoginForm;
