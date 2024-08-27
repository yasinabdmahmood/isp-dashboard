import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../helpers/formatDate';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'
import Table from 'react-bootstrap/Table';
import { getSubscriptionRecords, deleteSubscriptionRecord, getPaymentRecords } from '../../../redux/database/databaseReducer';
import Reducer from '../../../redux/helpers/reducer';
import isAdmin from '../../../helpers/isAdmin';
import trash from '../../assets/images/trash-fill.svg'
import add from '../../assets/images/plus-circle-fill.svg'
import view from '../../assets/images/eye-fill.svg'
import edit from '../../assets/images/pencil-square.svg'
import searchLogo from '../../assets/images/search.svg'
const { getSearchedExpenses, getExpenses, updateExpenseStatus } = Reducer.asyncThunks

const statusColor = (expenseStatus)=> {
  if(expenseStatus === 'pending') return 'black';
  if(expenseStatus === 'approved') return 'green';
  if(expenseStatus === 'rejected') return 'red';
}

function SearchedExpenses() {

  const expenses = useSelector(state => state.database.expenses);
  const page = useSelector(state => state.database.expenseIndex);
  //   expense = {
  //   id: 'number',
  //   amount: 'number',
  //   date: 'date',
  //   remark: 'remark',
  //   status: 'string',
  //   account_option_id: 'number',
  //   account_option: {
  //     id: 'number',
  //     options: 'string',
  //   }
  // }

  const [search, setSearch] = useState('');
  const [loadMoreButton, setLoadMoreButton] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elementRef = useRef(null);
  const handleExpenseUpdate = async (id,newStatus) => {
    // Display alert message and prompt user to continue or cancel
    const confirmed = window.confirm('This action is Irreversible');

    if(confirmed){
      const payload = {id,newStatus};
      const response = await dispatch(updateExpenseStatus(payload));
      if (response.type.includes('fulfilled')) {
        //await dispatch(getNonApprovedExpense());
        window.alert('Item updated successfully')
      }
      else {
        window.alert('Failed to updated the item, please try again')
      }
    }

  }
  const handleDeletion = async (id) => {
    // Display alert message and prompt user to continue or cancel
    const confirmed = window.confirm('Are you sure you want to delete this item?');

    if (confirmed) {
      const payload = { id };
      const response = await dispatch(deleteSubscriptionRecord(payload));
      if (response.type.includes('fulfilled')) {
        await dispatch(getPaymentRecords());
        window.alert('Item deleted successfully')
      }
      else {
        window.alert('Failed to delete the item, please try again')
      }

    } else {
      // User clicked Cancel, do nothing
      return;
    }
  }

  const filterItems = (item) => {
    const isClientName = item.client.name.toLowerCase().includes(search.toLowerCase());
    const isClientUsername = item.client.username?.toLowerCase().includes(search.toLowerCase());
    const isEmployeeName = item.employee.name.toLowerCase().includes(search.toLowerCase());
    const isSubscriptionType = item.subscription_type.category?.toLowerCase().includes(search.toLowerCase());
    if (isClientName || isClientUsername || isEmployeeName || isSubscriptionType) {
      return true
    }
    return false;
  };

  useEffect(() => {
    async function fetchData() {
      if (expenses.length === 0) {
        const payload = { page }
        const response = await dispatch(getExpenses(payload));
        if (!response.type.includes('fulfilled')) {
          alert("Something went wrong please try again !!");
        }
      }
      else {

      }
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    const payload = { page };
    const responce = await dispatch(getExpenses(payload));

    if (responce.payload.data.length < 20) {
      setLoadMoreButton(false);
    }
  }

  return (
    <div className={styles.container} ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
      <div className='d-flex flex-column flex-sm-row justify-content-between  align-items-center m-3'>
        <h3 className='text-center h4'>Searched Expenses</h3>

        <div className='d-flex  justify-content-center align-items-center mx-5'>
          <div className='d-flex  justify-content-center align-items-stretch m-1'>
            <div className={styles['search-container']}>
              <img src={searchLogo} className={styles['search-icon']} style={{ background: 'white' }} alt='search' />
              <input type="text" className={styles['search-input']} placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

          </div>

        </div>
      </div>

      <div className="px-sm-3" >
        <Table striped bordered hover responsive>
          <thead className="thead-dark" >
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Amount</th>
              <th scope="col">Remark</th>
              <th scope="col">Date</th>
              <th scope="col">Account option</th>
              <th scope="col">Employee</th>
              <th scope="col">Status</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map(expense => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.amount}</td>
                <td>{expense.remark}</td>
                <td>{expense.date}</td>
                <td>{expense.account_option?.options}</td>
                <td>{expense.employee?.name}</td>
                <td style={{ color: statusColor(expense.status) }}>{expense.status}</td>
                <td>
                  { expense.status === 'pending' && <>
                    <button
                      className='btn btn-sm btn-primary mx-1'
                      onClick={() => handleExpenseUpdate(expense.id, 'approved')} >
                      Approve
                    </button>
                    <button
                      className='btn btn-sm btn-danger mx-1'
                      onClick={() => handleExpenseUpdate(expense.id, 'rejected')}
                    >Reject
                    </button>
                  </>}
                  
                </td>
                {/* <td style={{whiteSpace: 'nowrap'}}>{formatDate(expense?.created_at)}</td> */}
                {/* { isAdmin() && 
                    <td className='d-flex justify-content-center'>
                      <img src={trash} style={{cursor: 'pointer'}} onClick={()=>handleDeletion(expense?.id)}/>
                    </td>
                    } */}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='my-3' style={{ display: loadMoreButton ? 'block' : 'none' }}>
          <button onClick={loadMore} className='btn btn-sm btn-primary'>Load more</button>
        </div>
      </div>
      <div className={styles['plus-sign']} >
        <button onClick={() => navigate('/home/expenses/new')} >
          <img src={plusSign} alt='Add sign' />
        </button>
      </div>
    </div>
  );
}

export default SearchedExpenses;