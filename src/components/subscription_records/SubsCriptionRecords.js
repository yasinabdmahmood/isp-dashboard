import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptionRecords } from '../../redux/database/databaseReducer';


function SubsCriptionRecords() {
    const subscriptionRecords = useSelector(state => state.database.subscriptionRecords);
    const dispatch = useDispatch();
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
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default SubsCriptionRecords;