import React from 'react';
import styles from './styles.module.scss'

const DatePicker = ({text,getDate}) => {
  const handleChange = (e)=>{
    getDate(e);
  }
  return (
    <div className={styles['form-container']}>
    <label htmlFor="from" className='bg-white'>{text}</label>
    <input
      type="date"
      onChange={(e) => handleChange(e.target.value)}
      className={styles['date']}
    />
  </div>
  );
};

export default DatePicker;
