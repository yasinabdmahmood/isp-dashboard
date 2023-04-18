import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearClientHistory, createClientContactInfo, deleteClient, deleteClientContactInfo, deleteSubscriptionRecord, filterClientHistory, getClientHistory, getClients, getPaymentRecords } from '../../redux/database/databaseReducer';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import isAdmin from '../../helpers/isAdmin';
import trash from '../../assets/images/trash-fill.svg';
import view from '../../assets/images/eye-fill.svg';
import edit from '../../assets/images/pencil-square.svg'
import add from '../../assets/images/plus-circle-fill.svg';

function ShowClient() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [inputValue, setInputValue] = useState('');

    // const addContactInfo = async (event) => {
    //     event.preventDefault();
    //     const payloadData = {
    //         client_id: id,
    //         contact_info: inputValue,
    //     }
    //     await dispatch(createClientContactInfo(payloadData));
    //     await dispatch(getClients());
    //     await dispatch(getClientHistory({id}));
    //     setInputValue('');
    // }

    // const removeContactInfo = async (id) => {
    //     const payloadData = {id}
    //     const confirm = window.confirm('Are you sure you want to delete this item')
    //     if(confirm){
    //     await dispatch(deleteClientContactInfo(payloadData));
    //     }
    //     else{
    //         return;
    //     }
    //     dispatch(getClients());
        
    // }

    
    
    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getClientHistory({id}))
        }
        fetchData();
        return () => {
            dispatch(clearClientHistory());
        }
    },[id])

    const client = useSelector(state => state.database?.clients?.find( cl => cl.id === parseInt(id)));
    const subscriptionRecords = useSelector(state => state.database?.clientHistory);
    const handleClientDeletion = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if(confirm){
            dispatch(deleteClient(id));
        }
        else{
            return;
        }
        
    };

    const handleSubscriptionRecordDeletion = async (id) => {
        // Display alert message and prompt user to continue or cancel
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        
        if (confirmed) {
          const payload = {id};
          dispatch(deleteSubscriptionRecord(payload));
          dispatch(filterClientHistory({id}));
          dispatch(getPaymentRecords());
        } else {
          // User clicked Cancel, do nothing
          return;
        }
      }

    if(subscriptionRecords === null ){
        return <div>Loading...</div>
    }
    return (
        <div>
           <h1 className='text-start  h4 m-4'>Show User</h1>
           <div>
                <ul>
                    <li>
                        <span className='h5' >Name: </span>
                        <span className='h5'>{client.name}</span>
                    </li>
                    <li>
                        <span className='h5'>Username: </span>
                        <span className='h5'>{client.username}</span>
                    </li>
                    <li>
                        <span className='h5'>Contact info: </span>
                        <ul>
                            {client.client_contact_informations.map( cl => {
                                return (
                                    <li key={cl.id} className='my-2'>
                                        <span >{cl.contact_info}</span>
                                    </li>
                                )
                            }
                                
                            )}
                        </ul>
                    </li>
                    { isAdmin() && <li className='d-flex my-3'>
                         
                        <div>
                        <span className='h5'>Actions</span>
                           <button
                            className='btn btn-sm btn-danger m-1'
                            onClick={()=>{handleClientDeletion(client?.id)}}
                            >
                             Delete
                            </button>
                            
                            <button
                            className='btn btn-sm btn-secondary m-1'
                            onClick={()=>{navigate(`/home/clients/edit/${client?.id}`)}}
                            >
                             Edit
                            </button>

                        </div>
                    </li>
                    }
                </ul>
        </div>
    <div className="p-sm-3 mt-5">
             <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Remaining Amount</th>
                    <th scope="col">Assigned Employee</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {subscriptionRecords?.map(subscriptionRecord => (
                    <tr key={subscriptionRecord.id}>
                    <td>{subscriptionRecord.client.name}</td>
                    <td>{subscriptionRecord.employee.name}</td>
                    <td>{subscriptionRecord.subscription_type.category}</td>
                    <td>{subscriptionRecord.pay}</td>
                    <td>{subscriptionRecord.subscription_type.cost - subscriptionRecord.pay}</td>
                    <td>{subscriptionRecord?.assigned_employee || 'N/A'}</td>
                    <td className='d-flex justify-content-around'>
                        { isAdmin() &&
                        <img src={trash} style={{cursor: 'pointer'}}  onClick={() => handleSubscriptionRecordDeletion(subscriptionRecord.id)} alt='delete' className='m-1'/>
                        }
                         <img src={add} style={{cursor: 'pointer'}}   onClick={()=>navigate(`/home/paymentRecords/new/${subscriptionRecord.id}`)} alt='Add payment' className='m-1'/>
                         <img src={view} style={{cursor: 'pointer'}}  onClick={()=>navigate(`/home/subscriptionRecords/history/${JSON.stringify(subscriptionRecord)}`)} alt='view' className='m-1'/>
                         <img src={edit}  onClick={()=>navigate(`/home/subscriptionRecords/edit/${JSON.stringify(subscriptionRecord)}`)} style={{cursor: 'pointer'}} className='m-1'/>
                    </td>
                    </tr>
                ))}
                </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ShowClient;