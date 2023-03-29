import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import isAdmin from '../../helpers/isAdmin';
import { clearPaymentHistory, getPaymentHistory, deletePaymentRecord, filterPaymentHistory } from '../../redux/database/databaseReducer';

function PaymentHistory() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const paymentRecords = useSelector(state=>state.database?.paymentHistory);

    const handleDeletion = async (id) => {
      // Display alert message and prompt user to continue or cancel
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      
      if (confirmed) {
        const payload = {id};
        await dispatch(deletePaymentRecord(payload));
        dispatch(filterPaymentHistory({id}))
      } else {
        // User clicked Cancel, do nothing
        return;
      }
    }

    useEffect(()=>{
        const fetchData = async() => {
            await dispatch(getPaymentHistory({id}))
        }
        fetchData();
        return () => {
            dispatch(clearPaymentHistory());
        }
    },[id]);

    if( paymentRecords === null ){
        return <div>Loading ...</div>
    }
    return (
        <div>
            <h1>Payment history</h1>
            <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped">
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    { isAdmin() && <th scope="col">Action</th> }
                </tr>
                </thead>
                <tbody>
                {paymentRecords?.map(paymentRecord => (
                    <tr key={paymentRecord.id}>
                    <td>{paymentRecord.subscription_record.client.name}</td>
                    <td>{paymentRecord.employee.name}</td>
                    <td>{paymentRecord.amount}</td>
                    <td>{formatDate(paymentRecord.created_at)}</td>
                    { isAdmin() &&
                    <td>
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={()=>handleDeletion(paymentRecord.id)}>
                        Delete
                      </button>
                    
                    </td>
                    }
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default PaymentHistory;