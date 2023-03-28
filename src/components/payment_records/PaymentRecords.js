import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePaymentRecord, getPaymentRecords } from '../../redux/database/databaseReducer';
import formatDate from '../../helpers/formatDate';
import isAdmin from '../../helpers/isAdmin';

function PaymentRecords() {
    const paymentRecords = useSelector(state => state.database.paymentRecords);
    const dispatch = useDispatch();
    const elementRef = useRef(null);
    useEffect(()=>{
        async function fetchData() {
            if(paymentRecords.length < 20){
               await dispatch(getPaymentRecords())
            }
        }
        fetchData();
    },[paymentRecords.length]);

    const handleDeletion = async (id) => {
      // Display alert message and prompt user to continue or cancel
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      
      if (confirmed) {
        const payload = {id};
        await dispatch(deletePaymentRecord(payload));
      } else {
        // User clicked Cancel, do nothing
        return;
      }
    }

    function  handleScroll() {
        const element = elementRef.current;
  
        if (element.scrollTop + element.clientHeight === element.scrollHeight) {
          dispatch(getPaymentRecords());
        }
      }
  
      useEffect(() => {
        
    
        const element = elementRef.current;
        element.addEventListener('scroll', handleScroll);
    
        return () => {
          element.removeEventListener('scroll', handleScroll);
        };
      }, [handleScroll]);
  
      if (paymentRecords.length === 0) {
        return <div ref={elementRef}>Loading...</div>;
      }


    return (
        <div ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
           <h1 className='text-center'>Payment History</h1> 
           <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped">
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {paymentRecords?.map(paymentRecord => (
                    <tr key={paymentRecord.id}>
                    <td>{paymentRecord.subscription_record.client.name}</td>
                    <td>{paymentRecord.employee.name}</td>
                    <td>{paymentRecord.amount}</td>
                    <td>{formatDate(paymentRecord.created_at)}</td>
                    <td>

                    { isAdmin() && <button
                      className='btn btn-sm btn-danger'
                      onClick={()=>handleDeletion(paymentRecord.id)}>
                        Delete
                      </button>
                    }
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>
    );
}

export default PaymentRecords;