import React, { useState,useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime';
import { convertToRailsDateTime, formatDate } from '../../helpers/formatDate';
import 'react-datetime/css/react-datetime.css';
import styles from './styles.module.scss'
import { editSubscriptionRecord, getClients, getSubscriptionTypes } from '../../redux/database/databaseReducer';





function EditSubscriptionRecord() {
    const {sb} = useParams();
    const subscriptionRecord = JSON.parse(sb)
    

    const subscriptionTypes = useSelector( state => state.database.subscriptionTypes);
    const clients = useSelector( state => state.database.clients);
    const employees = useSelector( state => state.database.employees);
  
    const [client, setClient] = useState(subscriptionRecord.client.name);
    const [assignedEmployee, setAssignedEmployee] = useState(subscriptionRecord.assigned_employee);
    const [dateTime, setDateTime] = useState(new Date(subscriptionRecord.created_at));
    const [note, setNote] = useState(subscriptionRecord.note)

    

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      async function fetchData() {
        if(subscriptionTypes.length === 0){
          await dispatch(getClients());
        }
        if(clients.length === 0){
          await dispatch(getSubscriptionTypes());
        }
      }
      fetchData();
    }, [clients.length, subscriptionTypes.length]);
    
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      const clientId = clients.find( el => el.name === client)?.id
      if(!clientId){
        window.alert('This user does not exist')
        return;
      }
      const payloadData = {
          id: JSON.parse(sb).id,
          clientId: clientId,
          employeeId: JSON.parse(sessionStorage.getItem('user')).id ,
          assignedEmployee: assignedEmployee,
          note: note,
          created_at: convertToRailsDateTime(dateTime),
      }
      const response = await dispatch(editSubscriptionRecord(payloadData));
      if(response.type.includes('fulfilled')){
        navigate('/home/subscriptionRecords')
      }else{
        window.alert('The action failed, please try again')
      }
       
      
    };

    if (!clients) {
      return <div>Loading...</div>;
    }
  
  
    return (
      <>
      <h1 className='text-start  h4 m-4'>Edit Subscription Record</h1>
      <div className={styles['form-container']} >
      <Form onSubmit={handleSubmit}>
        <FormGroup className='d-flex flex-column'>
            <Label for="client">Client</Label>
            <input type="text" name="client" className={`bg-white ${styles.inputfield}`} id="cleint" placeholder="Type to search" value={client} onChange={(e) => setClient(e.target.value)} list="clients" autocomplete="off"/>
            <datalist id="clients">
                {clients.filter(el => el.name?.toLowerCase().includes(client?.toLowerCase())).map(el => (
                <option key={el.id} value={el.name}  />
                ))}
            </datalist>
        </FormGroup>

        <FormGroup className='d-flex flex-column'>
            <Label for="employee">Employee</Label>
            <input type="text" name="employee" className={`bg-white ${styles.inputfield}`} id="employee" placeholder="Type to search" value={assignedEmployee} onChange={(e) => setAssignedEmployee(e.target.value)} list="employees" autocomplete="off"/>
            <datalist id="employees">
                {employees.filter(el => el.name?.toLowerCase().includes(assignedEmployee?.toLowerCase())).map(el => (
                <option key={el.id} value={el.name}  />
                ))}
            </datalist>
        </FormGroup>
        
        {/* <FormGroup className='d-flex flex-column'>
            <Label for="subscription-type">Subscription Type</Label>
                <select name="subscription-type" className={`bg-white ${styles.inputfield}`} id="subscription-type" value={subscriptionType} onChange={(e) => setSubscriptionType(e.target.value)}>
                    {subscriptionTypes.map( subscriptionType => {
                        return <option value={subscriptionType.id}>{subscriptionType.category}</option>
                    })}
                </select>
        </FormGroup> */}

        {/* <FormGroup>
            <Label for="paid-amount">Paid amount</Label>
            <Input type="number" name="paid-amount" className={`bg-white ${styles.inputfield}`} id="pay" required value={pay} onChange={(e) => setPay(e.target.value)} />
        </FormGroup> */}
        <FormGroup>
          <Label for="datetime">Date and Time</Label>
          <DateTimePicker
            id="datetime"
            value={dateTime}
            onChange={(value) => setDateTime(value)}
            inputProps={{
              
              className: `bg-white ${styles.inputfield}`,
              autoComplete: 'off',
              placeholder: 'Enter date and time',
            }}
            dateFormat="YYYY/MM/DD"
            timeFormat="h:mm A"
            closeOnSelect
          />
        </FormGroup>
        <FormGroup>
          <textarea name="note" placeholder='Note' className={`bg-white ${styles.inputfield} w-100`} id="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </FormGroup>
        <Button color="primary" className='btn-sm' type="submit">Edit Subscription Record</Button>
      </Form>
      </div>
      
      </>
    );
}

export default EditSubscriptionRecord;