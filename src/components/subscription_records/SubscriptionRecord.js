import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helpers/formatDate';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'
import Table from 'react-bootstrap/Table';
import { getSubscriptionRecords, deleteSubscriptionRecord, getPaymentRecords } from '../../redux/database/databaseReducer';
import isAdmin from '../../helpers/isAdmin';
import trash from '../../assets/images/trash-fill.svg'
import add from '../../assets/images/plus-circle-fill.svg'
import view from '../../assets/images/eye-fill.svg'
import searchLogo from '../../assets/images/search.svg'

function SubscriptionRecord() {
    const subscriptionRecords = useSelector(state => state.database.subscriptionRecords);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('Client name');
    const [loading, setLoading] = useState(true)
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
          const response = await dispatch(getSubscriptionRecords());
          if(response.type.includes('fulfilled')){
            setLoading(false);
          }
      }
      else{
        setLoading(false)
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

    if (loading) {
      return <div ref={elementRef}>Loading...</div>;
    }
    

    return (
        <div className={styles.container} ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
          <div className='d-flex flex-column flex-sm-row justify-content-between  align-items-center m-3'>
          <h3 className='text-center h4'>Subscription Records</h3> 

            <div className='d-flex  justify-content-center align-items-center mx-5'>
            <div className='d-flex  justify-content-center align-items-stretch m-1'>
                <select value={searchType} className={styles['dropdown']} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="Client name">Client name</option>
                    <option value="Employee name">Employee name</option>
                    <option value="Subscription type">Subscription type</option>
                </select>
              <div className={styles['search-container']}>
               <img src={searchLogo} className={styles['search-icon']} style={{background: 'white'}} alt='search' />
               <input type="text" className={styles['search-input']} placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>   
            
            </div>  

            </div>
          </div>
           
           <div className="px-sm-3" >
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
                    <td style={{whiteSpace: 'nowrap'}}>{formatDate(subscriptionRecord.created_at)}</td>
                    <td className='d-flex justify-content-around align-items-stretch flex-nowrap'>
                        { isAdmin() && 
                        <img src={trash}  onClick={() => handleDeletion(subscriptionRecord.id)} style={{cursor: 'pointer'}} className='m-1'/>                     
                        }
                         <img src={add}  onClick={()=>navigate(`/home/paymentRecords/new/${subscriptionRecord.id}`)} style={{cursor: 'pointer'}} className='m-1'/>
                        <img src={view}  onClick={()=>navigate(`/home/subscriptionRecords/history/${subscriptionRecord.id}`)} style={{cursor: 'pointer'}} className='m-1'/>
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