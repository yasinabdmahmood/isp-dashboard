import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPaymentRecords } from '../../redux/database/databaseReducer';

function PaymentRecords() {
    const paymentRecords = useSelector(state => state.database.paymentRecords);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(paymentRecords.length === 0){
            dispatch(getPaymentRecords())
        }
    })
    return (
        <div>
           <h1>Payment Records</h1> 
           <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped w-75">
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                </tr>
                </thead>
                <tbody>
                {paymentRecords?.map(paymentRecord => (
                    <tr key={paymentRecord.id}>
                    <td>{paymentRecord.subscription_record.client.name}</td>
                    <td>{paymentRecord.employee.name}</td>
                    <td>{paymentRecord.amount}</td>
                    <td>{paymentRecord.created_at}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default PaymentRecords;