import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {formatDate} from '../../helpers/formatDate';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'
import Table from 'react-bootstrap/Table';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { deleteSubscriptionRecord, getEmployees, getPaymentRecords, getUnpaidSubscriptionRecords, assignedEmployees } from '../../redux/database/databaseReducer';
import isAdmin from '../../helpers/isAdmin';
import trash from '../../assets/images/trash-fill.svg'
import add from '../../assets/images/plus-circle-fill.svg'
import edit from '../../assets/images/pencil-square.svg'
import view from '../../assets/images/eye-fill.svg'
import searchLogo from '../../assets/images/search.svg'

function UnpaidSubscriptionRecord() {
    const subscriptionRecords = useSelector(state => state.database.unpaidSubscriptionRecords);
    const employees = useSelector(state => state.database.employees);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('Client name');
    const [loading, setLoading] = useState(true);
    const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
    const [assignedEmployee, setAssignedEmployee] = useState(employees[0]?.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elementRef = useRef(null);
    const handleDeletion = async (id) => {
        // Display alert message and prompt user to continue or cancel
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        
        if (confirmed) {
          const payload = {id};
          const response = await dispatch(deleteSubscriptionRecord(payload));
          if(response.type.includes('fulfilled')){
            await dispatch(getPaymentRecords());
            window.alert('Item deleted successfully')
          }
          else{
            window.alert('Failed to delete the item, please try again')
          }
          
        } else {
          // User clicked Cancel, do nothing
          return;
        }
      }

      const filterItems = (item) => {
        if (searchType === 'Client name' && item.client.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'Employee name' && item.employee.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'Subscription type' && item.subscription_type.category?.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'Client username' && item.client.username?.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if ((searchType === 'Assigned Employee' && item.assigned_employee?.toLowerCase().includes(search.toLowerCase())) || (item.assigned_employee === null && search === '')) {
          return true;
        }
        return false;
      };

    useEffect(() => {
      async function fetchData() {
        if(subscriptionRecords.length === 0){
          const response = await dispatch(getUnpaidSubscriptionRecords());
          if(response.type.includes('fulfilled')){
            setLoading(false);
          }
        }

        if(employees.length === 0){
          const response = await dispatch(getEmployees());
          if(response.type.includes('fulfilled')){
            setLoading(false);
          }
        }
      
        setLoading(false)
      }
      fetchData();
    }, []);


    if (loading) {
      return <div ref={elementRef}>Loading...</div>;
    }

    const handleSubmit = async(event) => {
      event.preventDefault();
      

      const payloadData = {
        employee: assignedEmployee ,
        subscriptionIds: selectedSubscriptions,
      }
      console.log(payloadData);
        setLoading(true);
        const response = await dispatch(assignedEmployees(payloadData));
        if(response.type.includes('fulfilled')){
          dispatch(getUnpaidSubscriptionRecords());
          setSelectedSubscriptions([]);
        }else{
          window.alert('The action failed, please try again')
        }
        setLoading(false); 
      
    }

    const updateCheckdeList = (number) => {
      const index = selectedSubscriptions.indexOf(number);

      if (index !== -1) {
        // Number found in array, remove it
        const newArray = [...selectedSubscriptions];
        newArray.splice(index, 1);
        setSelectedSubscriptions(newArray);
      } else {
        // Number not found in array, add it
        setSelectedSubscriptions(prev => [...prev, number]);
      }
    }

    const showClientInfo = (id) => {
      navigate(`/home/clients/${id}`)
    }
    

    return (
        <div className={styles.container} ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
          <div className='d-flex flex-column flex-sm-row justify-content-between  align-items-center m-3'>
          <h3 className='text-center h4'>Unpaid Subscription Records</h3> 

            <div className='d-flex  justify-content-center align-items-center mx-5'>
            <div className='d-flex  justify-content-center align-items-stretch m-1'>
            <select value={searchType} className={styles['dropdown']} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="Client name">Client name</option>
                    <option value="Client username">Client username</option>
                    <option value="Employee name">Employee name</option>
                    <option value="Assigned Employee">Assigned Employee</option>
                    <option value="Subscription type">Subscription type</option>
                </select>
              <div className={styles['search-container']}>
               <img src={searchLogo} className={styles['search-icon']} style={{background: 'white'}} alt='search' />
               <input type="text" className={styles['search-input']} placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>   
            
            </div>  

            </div>
          </div>
          { isAdmin() &&
          <Form onSubmit={handleSubmit} className='d-flex align-items-center'>
            <FormGroup className='d-flex align-items-center'>
                <Label for="employees">Set employee</Label>
                    <select name="employees" className={`bg-white p-1 px-2 m-1 ${styles.inputfield}`} id="employees" value={assignedEmployee} onChange={(e) => setAssignedEmployee(e.target.value)}>
                        {employees.map( employee => {
                            return <option value={employee.name}>{employee.name}</option>
                        })}
                    </select>
            </FormGroup>
            <Button color="primary" className='btn-sm mb-3' style={{cursor: loading? 'wait':'pointer'}} type="submit">Apply</Button>
          </Form>
          
          }
           
           <div className="px-sm-3" >
              <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Username</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Remaining Amount</th>
                    <th scope="col">Subscription Date</th>
                    { isAdmin() && <th scope="col">Assign</th> }
                    <th scope="col">Assigned Employee</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {subscriptionRecords?.filter( item => filterItems(item))?.map(subscriptionRecord => (
                    <tr style={{cursor: 'pointer'}} onClick={()=>showClientInfo(subscriptionRecord.client_id)} key={subscriptionRecord.id}>
                    <td onClick={() => showClientInfo(subscriptionRecord.client_id)}>{subscriptionRecord.client.name}</td>
                    <td>{subscriptionRecord.client.username}</td>
                    <td>{subscriptionRecord.employee.name}</td>
                    <td>{subscriptionRecord.subscription_type.category}</td>
                    <td>{subscriptionRecord.pay}</td>
                    <td>{subscriptionRecord.subscription_type.cost - subscriptionRecord.pay}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{formatDate(subscriptionRecord.created_at)}</td>
                    { isAdmin() && <td>
                      <input type="checkbox"
                          defaultChecked={false}
                          onChange={() => updateCheckdeList(subscriptionRecord.id)}
                      />
                    </td>
                    }
                    <td>{subscriptionRecord?.assigned_employee || 'N/A'}</td>
                    <td className='d-flex justify-content-around align-items-stretch flex-nowrap'>
                        { isAdmin() && 
                        <img src={trash}  onClick={(event) => {
                          event.stopPropagation();
                          handleDeletion(subscriptionRecord.id);
                        }}
                        style={{cursor: 'pointer'}} className='m-1'/>                     
                        }
                         <img src={add}  onClick={(event)=> { 
                          event.stopPropagation();
                          navigate(`/home/paymentRecords/new/${subscriptionRecord.id}`);
                          }}
                          style={{cursor: 'pointer'}} className='m-1'/>
                         <img src={view}  onClick={(event)=>{ 
                          event.stopPropagation();
                          navigate(`/home/subscriptionRecords/history`,{state: {subscriptionRecord}})
                          }} 
                          style={{cursor: 'pointer'}} className='m-1'/>
                         <img src={edit}  onClick={(event)=> { 
                          event.stopPropagation();
                          navigate(`/home/subscriptionRecords/edit`,{state: {subscriptionRecord}})
                          }}
                          style={{cursor: 'pointer'}} className='m-1'/>
                    </td>
                    </tr>
                ))}
                </tbody>
                </Table>
            </div>
            <div className={styles['plus-sign']} >
                <button onClick={() => navigate('/home/subscriptionRecords/new')} >
                  <img src={plusSign} alt='Add sign' />
                </button>
            </div>
        </div>
    );
}

export default UnpaidSubscriptionRecord;
