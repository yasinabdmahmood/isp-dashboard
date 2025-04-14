import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInCredentials, loggout } from '../../redux/login/loginReducer';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/app-state/appState';
import styles from './styles.module.scss'


const LoginForm = () => {
  const loading = useSelector( state => state.appState.loading)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('testuser@gmail.com');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setLoading(true))
    const payloadData = {email, password};
      const responce = await dispatch(getLoggedInCredentials(payloadData));
      if(responce.type.includes('fulfilled')){
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(Array.isArray(user)){
          console.log('first attempt to log in failed, starting the second attemp automtically')
          const r = await dispatch(loggout());
          if(r.type.includes('fulfilled')){
            await dispatch(getLoggedInCredentials(payloadData));
          }
        }else{
          // console.log('user is not an array, so no need to log out')
        }
        dispatch(setLoading(false))
        const loggedInEmployeeRole = JSON.parse(sessionStorage.getItem('user')).role;
        if(loggedInEmployeeRole !== 'admin'){
          navigate('/home/subscriptionRecords')
        }else{
          navigate('/home')
        }
      }
      dispatch(setLoading(false))
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
              <Button type="submit" color="primary" disabled={loading}>Login</Button>
            </Form>
          </div>
        </Container>
    </div>
    
  );

};

export default LoginForm;
