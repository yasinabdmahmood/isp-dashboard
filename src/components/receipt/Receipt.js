import React, { useEffect } from 'react';
import styles from './Receipt.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../helpers/formatDate';


const Receipt = () => {

  const navigate = useNavigate()  
  
  useEffect(()=>{
    window.print();
    navigate(-1);
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Receipt</h2>
        <p>{formatDate(new Date())}</p>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <span className={styles.itemName}>:اسم المشترك</span>
          <span className={styles.itemPrice}>$10.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>:تاريخ والوقت الاشتراك</span>
          <span className={styles.itemPrice}>$20.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>:تاريخ الدفع</span>
          <span className={styles.itemPrice}>$15.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>:الموضف</span>
          <span className={styles.itemPrice}>$8.50</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>:المبلغ</span>
          <span className={styles.itemPrice}>$12.25</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>:مجموع</span>
          <span className={styles.itemPrice}>$12.25</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.total}>Total: $66.75</span>
      </div>
    </div>
  );
};

export default Receipt;
