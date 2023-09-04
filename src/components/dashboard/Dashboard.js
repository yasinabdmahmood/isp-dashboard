import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import totalusers from '../../assets/images/totaluser.svg'
import paidusers from '../../assets/images/paiduser.svg'
import unpaidusers from '../../assets/images/unpaiduser.svg'
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Pie  } from 'react-chartjs-2';
import { getClients, getDailyReport, getSubscriptionRecords, getSubscriptionTypes, getUnpaidSubscriptionRecords } from '../../redux/database/databaseReducer';
import { useNavigate } from 'react-router-dom';
import CSVDownloadButton from '../helper_components/csv_download_button/CSVDownloadButton';

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  );

const getOneMonthAgoDate =() => {
  const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  return oneMonthAgo.toISOString().slice(0, 10);
}



const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10) // get today's date in the same format as '2023-05-04'
}

function Dashboard() {
  const subscriptionRecords = useSelector( state => state.database.subscriptionRecords);
  const unpaidUsers = useSelector( state => state.database.unpaidSubscriptionRecords);
  const clients = useSelector( state => state.database.clients );
  const subscriptionTypes = useSelector(state => state.database.subscriptionTypes );
  const dailyReport = useSelector(state => state.database.dailyReport);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const loggedInEmployeeRole = JSON.parse(sessionStorage.getItem('user'))?.role;
    if(loggedInEmployeeRole !== 'admin'){
      navigate('/home/subscriptionRecords');
    }
  })

  const [startDate, setStartDate] = useState(getOneMonthAgoDate()); // set default value to '2023-05-04'
  const [endDate, setEndDate] = useState(getTodayDate()); // set default value to '2023-05-04'
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(()=> {
    if(subscriptionRecords.length === 0){
      dispatch(getSubscriptionRecords());
    }
    if(clients.length === 0){
      dispatch(getClients());
    }
    if(subscriptionTypes.length === 0){
      dispatch(getSubscriptionTypes());
    }
    if(unpaidUsers){
      dispatch(getUnpaidSubscriptionRecords());
    };
    if(!dailyReport){
      dispatch(getDailyReport());
    };
  },[]);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const labels = subscriptionTypes.map( sb => sb.category)
  const chartData = labels.map( el => {
    return unpaidUsers.filter( sb => sb.category === el).length
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Subscription Records',
        data: chartData,
        borderColor: 'black',
        backgroundColor: ['aqua', 'red', 'green', 'blue', 'orange', 'purple', 'yellow'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Subscription Types',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of unpaid Subscription Records',
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  const pieChardData = {
    labels: Object.keys(dailyReport?.data.report.payment_statistics.sum_of_category_payment || {}),
    datasets: [
      {
        data: Object.values(dailyReport?.data.report.payment_statistics.sum_of_category_payment || {}), // Values corresponding to the labels
        backgroundColor: ['red', 'blue', 'green'], // Colors for each segment
      },
    ],
  };
  


  
 
  return (
    <div>
      <div className={styles['header-container']}>
        <h1 className='text-start h4 m-4'>Dashboard</h1>
        <div className={styles['form-container']}>
          <label htmlFor="from" className='bg-white'>From:</label>
          <input
            type="date"
            id="from"
            name="start"
            className={styles['date']}
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor="to" className='bg-white'>To:</label>
          <input
            type="date"
            id="to"
            name="end"
            className={styles['date']}
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className={styles['cards-container']}>
        <div 
        className={`${styles.card} ${styles['sky-blue']}`}
        onClick={() => navigate('/home/clients')}>
          <div className={styles['card-upper-part']}>
            <p>Total users</p>
            <img src={totalusers} alt='totalusers' />
          </div>
          <span>{clients.length}</span>
        </div>
        {/* <div className={`${styles.card} ${styles['sky-blue']}`}>
        <div className={styles['card-upper-part']}>
          <p>Paid users</p>
          <img src={paidusers} alt='paidusers' />
        </div>
        <span>684</span>
        </div> */}
        <div 
        className={`${styles.card} ${styles['pink']}`}
        onClick={() => navigate('/home/unpaidSubscriptionRecords')}>
        <div 
        className={styles['card-upper-part']}
        
        style={{'cursor': 'pointer'}}>
          <p>Unpaid users</p>
          <img src={unpaidusers} alt='unpaidusers' />
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <span>{unpaidUsers?.length}</span>
          <span style={{'fontSize': '1rem'}}>{(unpaidUsers.reduce( (ac,cr) => ac + parseFloat(cr.subscription_type.cost) - parseFloat(cr.pay), 0)).toLocaleString()} IQD</span>
        </div>
        </div>
      </div>
      <div className={styles['bar-chart-container']}>
        {/* <Bar
        data={data}
        options={options}
        className={styles['bar-chart']}
        >
        </Bar> */}
        <Pie
          data={pieChardData}
          className={styles['bar-chart']}
        >
        </Pie>
        
      </div>
      {/* <button
      className='btn btn-sm btn-primary'
      onClick={downloadCSV}>Export CSV file</button> */}
      <div className='d-flex justify-content-around p-3'>
        <CSVDownloadButton label='Export subscriptions' endPoint='download_subscription_records_as_csv' />
        <CSVDownloadButton label='Export Subscription Types' endPoint='download_subscription_types_as_csv' />
        <CSVDownloadButton label='Export Payment Records' endPoint='download_payment_records_as_csv' />
        <CSVDownloadButton label='Export Clients' endPoint='download_clients_as_csv' />
      </div>
      
    </div>
  );
}

export default Dashboard;
