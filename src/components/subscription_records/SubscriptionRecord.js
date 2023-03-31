import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'
import Table from 'react-bootstrap/Table';
import { getSubscriptionRecords, deleteSubscriptionRecord, getPaymentRecords } from '../../redux/database/databaseReducer';
import isAdmin from '../../helpers/isAdmin';

function SubscriptionRecord(props) {
    const subscriptionRecords = useSelector(state => state.database.subscriptionRecords);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('Client name');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const elementRef = useRef(null);
    const handleDeletion = async (id) => {
        // Display alert message and prompt user to continue or cancel
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        
        if (confirmed) {
          const payload = {id};
          const response = await dispatch(deleteSubscriptionRecord(payload));
          if(response.type.includes('fulfilled')){
            await dispatch(getPaymentRecords());
            window.alert('Item deleted successfully')
          }
          else{
            window.alert('Failed to delete the item, please try again')
          }
          
        } else {
          // User clicked Cancel, do nothing
          return;
        }
      }

      const filterItems = (item) => {
        if (searchType === 'Client name' && item.client.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'Employee name' && item.employee.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'Subscription type' && item.subscription_type.category?.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      };

    useEffect(() => {
      async function fetchData() {
        if(subscriptionRecords.length === 0){
          await dispatch(getSubscriptionRecords())
      }
      }
      fetchData();
    }, []);

      function  handleScroll() {
      const element = elementRef.current;

      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 20) {
        dispatch(getSubscriptionRecords());
      }
    }

    useEffect(() => {
      
  
      const element = elementRef.current;
      element.addEventListener('scroll', handleScroll);
  
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }, []);

    if (subscriptionRecords.length === 0) {
      return <div ref={elementRef}>Loading...</div>;
    }
    

    return (
        <div className={styles.container} ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
          <div className='d-flex flex-column flex-sm-row justify-content-between  align-items-center'>
          <h3 className='text-center'>Subscription Records</h3> 

            <div className='d-flex  justify-content-center align-items-center mx-5'>
            <div className='m-1'>
            <span>Search by</span>
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="Client name">Client name</option>
                    <option value="Employee name">Employee name</option>
                    <option value="Subscription type">Subscription type</option>
                </select>
            </div>
            <div className='m-1'>
                <span>Search</span>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>  

            </div>
          </div>
           
           <div className="container d-flex justify-content-center mt-5 pb-5" >
              <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Employee</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Paid Amount</th>
                    <th scope="col">Remaining Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {subscriptionRecords?.filter( item => filterItems(item))?.map(subscriptionRecord => (
                    <tr key={subscriptionRecord.id}>
                    <td>{subscriptionRecord.client.name}</td>
                    <td>{subscriptionRecord.employee.name}</td>
                    <td>{subscriptionRecord.subscription_type.category}</td>
                    <td>{subscriptionRecord.pay}</td>
                    <td>{subscriptionRecord.subscription_type.cost - subscriptionRecord.pay}</td>
                    <td>{formatDate(subscriptionRecord.created_at)}</td>
                    <td>
                        { isAdmin() && <button 
                        className='btn btn-sm btn-danger m-1'
                        onClick={() => handleDeletion(subscriptionRecord.id)}
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
                </Table>
            </div>
            <div className={styles['plus-sign']}>
                <button onClick={() => navigate('/home/subscriptionRecords/new')} >
                  <img src={plusSign} alt='Add sign' />
                </button>
            </div>
        </div>
    );
}

export default SubscriptionRecord;