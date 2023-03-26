import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import { clearPaymentHistory, getPaymentHistory } from '../../redux/database/databaseReducer';

function PaymentHistory() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const paymentRecords = useSelector(state=>state.database?.paymentHistory)

    useEffect(()=>{
        const fetchData = async() => {
            await dispatch(getPaymentHistory({id}))
        }
        fetchData();
        return () => {
            dispatch(clearPaymentHistory());
        }
    },[]);

    if( paymentRecords === null ){
        return <div>Loading ...</div>
    }
    return (
        <div>
            <h1>history {id}</h1>
            <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped">
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
                    <td>{formatDate(paymentRecord.created_at)}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default PaymentHistory;