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
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { getClients, getSubscriptionRecords, getUnpaidSubscriptionRecords } from '../../redux/database/databaseReducer';

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
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
  const clients = useSelector( state => state.database.clients )
  const dispatch = useDispatch();
  
  
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
    if(unpaidUsers){
      dispatch(getUnpaidSubscriptionRecords());
    }
  },[]);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const labels = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekAgo);
    date.setDate(date.getDate() + i);
    labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
  }

  const filteredRecords = subscriptionRecords.filter((record) => {
    const recordDate = new Date(record.created_at);
    return recordDate >= weekAgo && recordDate < new Date();
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Subscription Records',
        data: [
         27,35,46,12,20,50,40
        ],
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
          text: 'Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Subscription Records',
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
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
        <div className={`${styles.card} ${styles['sky-blue']}`}>
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
        <div className={`${styles.card} ${styles['pink']}`}>
        <div className={styles['card-upper-part']}>
          <p>Unpaid users</p>
          <img src={unpaidusers} alt='unpaidusers' />
        </div>
        <span>{unpaidUsers?.length}</span>
        </div>
      </div>
      <div className={styles['bar-chart-container']}>
        <Bar
        data={data}
        options={options}
        className={styles['bar-chart']}
        >
        </Bar>
      </div>
      
    </div>
  );
}

export default Dashboard;
