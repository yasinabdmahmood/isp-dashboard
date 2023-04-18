import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {formatDate} from '../../helpers/formatDate';
import isAdmin from '../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import { clearPaymentHistory, getPaymentHistory, deletePaymentRecord, filterPaymentHistory } from '../../redux/database/databaseReducer';
import trash from '../../assets/images/trash-fill.svg'

function PaymentHistory() {
    const location = useLocation();
    const subscriptionRecord = location.state?.subscriptionRecord;
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
            await dispatch(getPaymentHistory({id: subscriptionRecord.id}))
        }
        fetchData();
        return () => {
            dispatch(clearPaymentHistory());
        }
    },[subscriptionRecord.id]);

    if( paymentRecords === null ){
        return <div>Loading ...</div>
    }
    return (
        <div>
            <h1 className='text-start h4 m-4'>Subscription Payment history</h1>
            <div className="p-sm-3 mt-5">
            <textarea rows="5" className='w-100' readonly>{subscriptionRecord.note || 'N/A'}</textarea>
            </div>
            <div className="p-sm-3 mt-5">
            <Table striped bordered hover responsive>
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
                    <td className='d-flex justify-content-center'>
                      <img src={trash} alt='delete' style={{cursor: 'pointer'}}  onClick={()=>handleDeletion(paymentRecord.id)} />
                    {/* <button
                      className='btn btn-sm btn-danger'
                      onClick={()=>handleDeletion(paymentRecord.id)}>
                        Delete
                      </button> */}
                    
                    </td>
                    }
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
}

export default PaymentHistory;