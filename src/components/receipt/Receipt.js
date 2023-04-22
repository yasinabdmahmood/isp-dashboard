import React, { useRef } from 'react';
import styles from './Receipt.module.css';

const Receipt = () => {
  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open('', 'PRINT', 'height=600,width=800');
  
    printWindow.document.write(`<html><head><title>Receipt</title>`);
    printWindow.document.write(`<link rel="stylesheet" href="print.css" type="text/css" media="print" />`);
    printWindow.document.write(`</head><body>`);
    printWindow.document.write(content);
    printWindow.document.write(`</body></html>`);
  
    printWindow.document.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/
  
    // Wait for the print dialog to be closed before closing the print window
    printWindow.addEventListener('afterprint', () => {
      printWindow.close();
    });
  
    // Trigger the print dialog
    printWindow.print();
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Receipt</h2>
        <p>Date: 22/04/2023</p>
      </div>
      <div className={styles.items} ref={printRef}>
        <div className={styles.item}>
          <span className={styles.itemName}>Item 1</span>
          <span className={styles.itemPrice}>$10.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>Item 2</span>
          <span className={styles.itemPrice}>$20.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>Item 3</span>
          <span className={styles.itemPrice}>$15.00</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>Item 4</span>
          <span className={styles.itemPrice}>$8.50</span>
        </div>
        <div className={styles.item}>
          <span className={styles.itemName}>Item 5</span>
          <span className={styles.itemPrice}>$12.25</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.total}>Total: $66.75</span>
      </div>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
};

export default Receipt;
