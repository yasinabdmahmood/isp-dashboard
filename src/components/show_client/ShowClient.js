import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearClientHistory, createClientContactInfo, deleteClient, deleteClientContactInfo, deleteSubscriptionRecord, filterClientHistory, getClientHistory, getClients, getPaymentRecords } from '../../redux/database/databaseReducer';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import isAdmin from '../../helpers/isAdmin';

function ShowClient() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [inputValue, setInputValue] = useState('');

    const addContactInfo = async (event) => {
        event.preventDefault();
        const payloadData = {
            client_id: id,
            contact_info: inputValue,
        }
        await dispatch(createClientContactInfo(payloadData));
        await dispatch(getClients());
        await dispatch(getClientHistory({id}));
        setInputValue('');
    }

    const removeContactInfo = async (id) => {
        const payloadData = {id}
        const confirm = window.confirm('Are you sure you want to delete this item')
        if(confirm){
        await dispatch(deleteClientContactInfo(payloadData));
        }
        else{
            return;
        }
        dispatch(getClients());
        
    }

    
    
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
           <h1>Show User {id}</h1>
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
                                        <button 
                                        onClick={()=>removeContactInfo(cl.id)}
                                        className='btn btn-sm btn-danger mx-2'
                                        >Remove
                                        </button>
                                    </li>
                                )
                            }
                                
                            )}
                        </ul>
                    </li>
                    <li>
                    <form className="form-inline d-flex flex-md-row flex-column" onSubmit={addContactInfo}>
                    <div className="">
                        <label htmlFor="inputField" className="h5 m-1">Add contact info</label>
                        <input type="text" className="" id="inputField" placeholder="Enter text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary mx-1">Add</button>
                    </form>
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
           {/* <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped w-75">
               <thead className="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                        <tr key={client?.id}>
                        <td>{client?.name}</td>
                        <td>{client?.username}</td>
                        <td>{client?.client_contact_informations[0]?.contact_info || 'No contact information'}</td>
                        <td>
                            { isAdmin() && <>
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
                            </> 
                            }
                        </td>
                        </tr>       
                </tbody>
      </table>
    </div>  */}
    <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped ">
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Remaining Amount</th>
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
                    <td>
                        { isAdmin() &&<button 
                        className='btn btn-sm btn-danger m-1'
                        onClick={() => handleSubscriptionRecordDeletion(subscriptionRecord.id)}
                        >
                            Delete
                        </button>
                        }
                        <button 
                        className='btn btn-sm btn-secondary m-1'
                        onClick={()=>navigate(`/home/paymentRecords/new/${subscriptionRecord.id}`)}
                        >
                            Add payment
                        </button>
                        <button 
                        className='btn btn-sm btn-info m-1'
                        onClick={()=>navigate(`/home/subscriptionRecords/history/${subscriptionRecord.id}`)}
                        >
                            view
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default ShowClient;