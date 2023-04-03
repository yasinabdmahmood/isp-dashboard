import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function Dashboard() {
  const subscriptionRecords = useSelector( state => state.database.subscriptionRecords);
  const dispatch = useDispatch();

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
      <h1 className='text-start h4 m-4'>Under development</h1>
      <Bar
      data={data}
      options={options}
      >
      </Bar>
    </div>
  );
}

export default Dashboard;
