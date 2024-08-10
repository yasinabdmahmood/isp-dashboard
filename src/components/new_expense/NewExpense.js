import React, { useState, useEffect, useRef } from 'react';
import isAdminPlus from '../../helpers/isAdminPlus';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DateTimePicker from 'react-datetime';
import { convertToRailsDateTime } from '../../helpers/formatDate';
import 'react-datetime/css/react-datetime.css';
import styles from './styles.module.scss'
import { createSubscriptionRecord } from '../../redux/database/databaseReducer';
import Reducer from '../../redux/helpers/reducer';
const { getAccountOptions, createAccountOptions, createExpense } = Reducer.asyncThunks

function NewExpense() {
  const accountOptions = useSelector(state => state.database.accountOptions);

  const textAreaRef = useRef();

  const [amount, setAmount] = useState(null);
  const [accountOption, setAccountOption] = useState(null);
  const [date, setDate] = useState(new Date());
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (accountOptions.length === 0) {
        await dispatch(getAccountOptions());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (accountOptions) {
      setAccountOption(accountOptions[0]?.id);
      setAmount('');
    }
  }, [accountOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    const payloadData = {
      amount,
      remark,
      account_option_id: accountOption,
      date: convertToRailsDateTime(date),
    }
    setLoading(true);
    const response = await dispatch(createExpense(payloadData));
    if (response.type.includes('fulfilled')) {
      navigate(-1)
    } else {
      window.alert('The action failed, please try again')
    }
    setLoading(false);

  };

  const createAccountOptionHandler = async (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    const payloadData = {
      options: textAreaRef.current.value
    }
    setLoading(true);
    const response = await dispatch(createAccountOptions(payloadData));
    if (response.type.includes('fulfilled')) {
      textAreaRef.current.value = '';
      window.alert('The account option was created successfully')
    } else {
      window.alert('The action failed, please try again')
    }
    setLoading(false);
  }

  if (!accountOptions) {
    return <div>Loading...</div>;
  }



  return (
    <>
      <h1 className='text-start  h4 m-4'>Create Expense</h1>
      <div className={styles['form-container']} >
        <Form onSubmit={handleSubmit}>
          <FormGroup className='d-flex flex-column'>
            <Label for="account-option">Option</Label>
            <select name="account-options" className={`bg-white ${styles.inputfield}`} id="account_option" value={accountOption} onChange={(e) => setAccountOption(e.target.value)}>
              {accountOptions.map(accountOption => {
                return <option value={accountOption.id}>{accountOption.options}</option>
              })}
            </select>
          </FormGroup>

          <FormGroup>
            <Label for="paid-amount">Amount</Label>
            <Input type="number" name="paid-amount" className={`bg-white ${styles.inputfield}`} id="pay" required value={amount} onChange={(e) => setAmount(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="datetime">Date and Time</Label>
            <DateTimePicker
              id="datetime"
              value={date}
              onChange={(value) => setDate(value)}
              inputProps={{

                className: `bg-white ${styles.inputfield}`,
                autoComplete: 'off',
                placeholder: 'Enter date and time',
              }}
              dateFormat="YYYY/MM/DD"
              timeFormat="HH:mm"
              closeOnSelect
            />
          </FormGroup>
          <FormGroup>
            <textarea name="note" placeholder='Remark' className={`bg-white ${styles.inputfield} w-100`} id="note" value={remark} onChange={(e) => setRemark(e.target.value)} />
          </FormGroup>
          <Button color="primary" className='btn-sm' style={{ cursor: loading ? 'wait' : 'pointer' }} type="submit">Create Expense</Button>
        </Form>
      </div>
      <div className='m-2'>
        <hr />
      </div>
      {isAdminPlus() && <div className={styles['form-container']} >
        <Form onSubmit={createAccountOptionHandler}>
          <FormGroup>
            <textarea ref={textAreaRef} name="note" placeholder='Account options' className={`bg-white ${styles.inputfield} w-100`} id="note" />
          </FormGroup>
          <Button color="primary" className='btn-sm' style={{ cursor: loading ? 'wait' : 'pointer' }} type="submit">Create option</Button>
        </Form>
      </div>}

    </>
  );
}

export default NewExpense;