import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { getSubscriptionRecords } from '../../redux/database/databaseReducer';

ChartJs.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  );

const getOneMonthAgoDate =() => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, '0');
  const day = String(oneMonthAgo.getDate()).padStart(2, '0');

  return `${month}/${day}/${year}`;
}

const getTodayDate = () => {
  return new Date().toISOString().substr(0, 10); // get today's date in the same format as '2023-05-04'
}

function Dashboard() {
  const subscriptionRecords = useSelector( state => state.database.subscriptionRecords);
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
  },[])

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
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 0).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 1).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 2).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 3).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 4).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 5).length,
          filteredRecords.filter((record) => new Date(record.created_at).getDay() === 6).length,
        ],
        borderColor: 'black',
        backgroundColor: ['aqua', 'red', 'green', 'blue', 'orange', 'purple', 'yellow'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
        <h1 className='text-start h4 m-4'>Under development</h1>
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
      
      {/* <Bar
      data={data}
      options={options}
      >
      </Bar> */}
    </div>
  );
}

export default Dashboard;
