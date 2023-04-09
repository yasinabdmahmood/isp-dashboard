import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePaymentRecord, getPaymentRecords } from '../../redux/database/databaseReducer';
import Table from 'react-bootstrap/Table';
import {formatDate} from '../../helpers/formatDate';
import isAdmin from '../../helpers/isAdmin';
import trash from '../../assets/images/trash-fill.svg'

function PaymentRecords() {
    const paymentRecords = useSelector(state => state.database.paymentRecords);
    const dispatch = useDispatch();
    const elementRef = useRef(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchData() {
            if(paymentRecords.length < 20){
               const response = await dispatch(getPaymentRecords());
               if(response.type.includes('fulfilled')){
                setLoading(false);
               }
            }
            else{
              setLoading(false)
            }
        }
        fetchData();
    },[paymentRecords.length]);

    const handleDeletion = async(id) => {
      // Display alert message and prompt user to continue or cancel
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      
      if (confirmed) {
        const payload = {id};
        const response = await dispatch(deletePaymentRecord(payload));
        if(response.type.includes('fulfilled')){
          window.alert('Item deleted successfully')
        }
        else{
          window.alert('Failed to delete the item')
        }
      } else {
        // User clicked Cancel, do nothing
        return;
      }
    }

    function  handleScroll() {
        const element = elementRef.current;
  
        if (element.scrollTop + element.clientHeight >= element.scrollHeight - 20) {
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
  
      if (loading) {
        return <div ref={elementRef}>Loading...</div>;
      }


    return (
        <div ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
           <h1 className='text-start text-black h4 m-4'>Payment History</h1> 
           <div className="p-sm-3 mt-2">
           <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    { isAdmin() && <th scope="col">Actions</th> }
                </tr>
                </thead>
                <tbody>
                {paymentRecords?.map(paymentRecord => (
                    <tr key={paymentRecord.id}>
                    <td>{paymentRecord.subscription_record.client.name}</td>
                    <td>{paymentRecord.employee.name}</td>
                    <td>{paymentRecord.amount}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{formatDate(paymentRecord.created_at)}</td>
                    { isAdmin() && 
                    <td className='d-flex justify-content-center'>
                      <img src={trash} style={{cursor: 'pointer'}} onClick={()=>handleDeletion(paymentRecord.id)}/>
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

export default PaymentRecords;