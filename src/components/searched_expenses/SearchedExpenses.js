import React, { useEffect, useState, useRef } from 'react';
import CSVDownloadButton from '../helper_components/csv_download_button/CSVDownloadButton';
import DatePicker from './date_picker/DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss'
import Table from 'react-bootstrap/Table';
import Reducer from '../../redux/helpers/reducer';

const { getSearchedExpenses, updateExpenseStatus } = Reducer.asyncThunks

const statusColor = (expenseStatus) => {
  if (expenseStatus === 'pending') return 'black';
  if (expenseStatus === 'approved') return 'green';
  if (expenseStatus === 'rejected') return 'red';
}

const parseDateRange = (startDate, endDate) => {
  // This function takes two string parameters representing a start date
  // and an end date in the format 'YYYY-MM-DD'. It parses these dates 
  // and returns an object containing the individual day, month, and year
  //  components of both the start and end dates.
  // input example ('2024-05-16', '2024-06-18')
  // output 
  // {
  //   start_day: 16,
  //   start_month: 5,
  //   start_year: 2024,
  //   end_day: 18,
  //   end_month: 6,
  //   end_year: 2024,
  // }
  const [start_year, start_month, start_day] = startDate.split('-');
  const [end_year, end_month, end_day] = endDate.split('-');
  return { start_year, start_month, start_day, end_year, end_month, end_day }
}

function SearchedExpenses() {
  const searchedExpenses = useSelector(state => state.database.searchedExpenses);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
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

  const getStartDate = (date) => {
    setStartDate(date);
  }
  const getEndDate = (date) => {
    setEndDate(date);
  }
  const handleGetDates = async () => {
    const [start_year, start_month, start_day] = startDate.split('-');
    const [end_year, end_month, end_day] = endDate.split('-');
    const payload = { start_day, start_month, start_year, end_day, end_month, end_year }
    const response = await dispatch(getSearchedExpenses(payload));
    if (response.type.includes('fulfilled')) {
      //await dispatch(getNonApprovedExpense());
      window.alert('Item updated successfully')
    }
    else {
      window.alert('Failed to updated the item, please try again')
    }
  };

  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const handleExpenseUpdate = async (id, newStatus) => {
    // Display alert message and prompt user to continue or cancel
    const confirmed = window.confirm('This action is Irreversible');

    if (confirmed) {
      const payload = { id, newStatus };
      const response = await dispatch(updateExpenseStatus(payload));
      if (response.type.includes('fulfilled')) {
        //await dispatch(getNonApprovedExpense());
        window.alert('search was successful')
      }
      else {
        window.alert('Failed to fetch data, please try again')
      }
    }

  }


  return (
    <div className={styles.container} ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
      <div className='d-flex flex-column flex-sm-row justify-content-between  align-items-center m-3'>
        <h3 className='text-center h4'>Searched Expenses</h3>
        <DatePicker text={'Start date'} getDate={getStartDate} />
        <DatePicker text={'End date'} getDate={getEndDate} />
        <button onClick={handleGetDates}>Get Selected Date</button>


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
            {searchedExpenses?.map(expense => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.amount}</td>
                <td>{expense.remark}</td>
                <td>{expense.date}</td>
                <td>{expense.account_option?.options}</td>
                <td>{expense.employee?.name}</td>
                <td style={{ color: statusColor(expense.status) }}>{expense.status}</td>
                <td>
                  {expense.status === 'pending' && <>
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
        {/* <div className='my-3' style={{ display: loadMoreButton ? 'block' : 'none' }}>
          <button onClick={loadMore} className='btn btn-sm btn-primary'>Load more</button>
        </div> */}
      </div>
      <CSVDownloadButton
        label='Export expenses'
        endPoint='download_searched_expenses_as_csv'
        params={parseDateRange(startDate, endDate)} />
    </div>
  );
}

export default SearchedExpenses;