import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './styles.module.scss'

const DatePicker = forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState('');

  // This allows the parent to access the date
  useImperativeHandle(ref, () => ({
    getDate: () => selectedDate,
  }));

  return (
    <div className={styles['form-container']}>
    <label htmlFor="from" className='bg-white'>{props.text}</label>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className={styles['date']}
    />
  </div>
  );
});

export default DatePicker;
