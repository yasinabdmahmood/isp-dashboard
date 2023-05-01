import React, { useEffect } from 'react';
import styles from './Receipt.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { convertToRailsDateTime, formatDate } from '../../helpers/formatDate';
import internetDish from '../../assets/images/powerbeam.png'


const Receipt = () => {
  
  const date = new Date();

  const location = useLocation();
  const subscriptionRecord = location.state?.subscriptionRecord;

  const navigate = useNavigate()  

  const getUserName = () => {
    let loggedInEmployee = sessionStorage.getItem('user');
    let retrievedData = JSON.parse(loggedInEmployee);
    return retrievedData.name
  }
  
  useEffect(()=>{

      window.print();
      navigate(-1);
  })

  
  return (
    <>
      <div className={styles.header}>
        <h1>بابان نيت لخدمات الانترنيت</h1>
        <div>
          <h2>0770 359 88 00</h2>
          <h2>0770 161 85 71</h2>
        </div>
        <div>
          <img src={internetDish} alt="Dish" />
        </div>
      </div>
      <div className={styles.date}>
      <span>{new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}:تاريخ دفع الاشتراك</span>
      </div>
      <div className={styles['fields-container']}>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:اسم الموضف</div>
          <div className={styles.value}>{getUserName()}</div>
        </div>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:استلمت من السيد</div>
          <div className={styles.value}>{subscriptionRecord.client.name}</div>
        </div>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:مبلغ و قدره</div>
          <div className={styles.value}>{subscriptionRecord.pay} IQD</div>
        </div>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:الملاحضة</div>
          <div className={styles.value}></div>
        </div>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:رقم الموبايل</div>
          <div className={styles.value}></div>
        </div>
        <div className={styles['field-container']}>
          <div className={styles.lable}>:تاريخ تفعيل الاشتراك</div>
          <div className={styles.value}>{convertToRailsDateTime(subscriptionRecord.created_at)}</div>
        </div>
      </div>
      <div className={styles.address}>
        <span>شورجة - قرب جسر شورجة - مقابل غسل كامران</span>
      </div>
      <div className={styles.signiture}>
        <span>توقيع المستلم</span>
      </div>
    </>
  );
};

export default Receipt;
