import React from 'react';
import Popup from 'reactjs-popup';
import styles from './styles.module.css'
import 'reactjs-popup/dist/index.css';

const destructObject = (obj) => {
    const parsedObject = JSON.parse(obj)
    const keyValueArray = Object.entries(parsedObject);
    return keyValueArray;
}

export default ({children, data}) => (
  <Popup
    trigger={children}
    modal
    nested
  >
    {close => (
      <div className={styles.modal}>
        <button className={styles.close} onClick={close}>
          &times;
        </button>
        <div className={styles.header}> Activity details </div>
        <div className={styles.content}>
          {destructObject(data).map(([key, value]) => {
            if(Array.isArray(value)){
              return (
                <>
                  <p><strong>old {key} : {value[0]}</strong></p>
                  <p><strong>New {key} : {value[1]}</strong></p>
                </>
              )
            }
            return <p>{key} : {value}</p>
            })
          }
        </div>
      </div>
    )}
  </Popup>
);