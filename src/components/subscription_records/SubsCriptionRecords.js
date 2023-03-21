import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSubscriptionRecords, deleteSubscriptionRecord, getPaymentRecords } from '../../redux/database/databaseReducer';


function SubscriptionRecords() {
    const subscriptionRecords = useSelector(state => state.database.subscriptionRecords);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDeletion = async (id) => {
        // Display alert message and prompt user to continue or cancel
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        
        if (confirmed) {
          const payload = {id};
          await dispatch(deleteSubscriptionRecord(payload));
          dispatch(getPaymentRecords());
        } else {
          // User clicked Cancel, do nothing
          return;
        }
      }
    useEffect(()=>{
        if(subscriptionRecords.length === 0){
            dispatch(getSubscriptionRecords())
        }
    })
    return (
        <div>
           <h1>SubsCriptionRecord</h1> 
           <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped w-75">
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">Client</th>
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
                        <button 
                        className='btn btn-sm btn-danger m-1'
                        onClick={() => handleDeletion(subscriptionRecord.id)}
                        >
                            Delete
                        </button>
                        <button 
                        className='btn btn-sm btn-secondary m-1'
                        onClick={()=>navigate(`/home/paymentRecords/new/${subscriptionRecord.id}`)}
                        >
                            Add payment
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div>
                <button onClick={() => navigate('/home/subscriptionRecords/new')} className='btn btn-primary'>Create</button>
            </div>
        </div>
    );
}

export default SubscriptionRecords;