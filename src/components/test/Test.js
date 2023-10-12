import React from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getTestData } from '../../redux/database/databaseReducer';

function Test() {

    const testData = useSelector( state => state.database?.test?.data);
    const dispatch = useDispatch();
    const fetchData = () => {
        const payload = {};
        dispatch(getTestData(payload))
    }
    return (
        <div>
            <h1>This is test page</h1>
            <h2>{testData || "No data has been fetched yes"}</h2>
            <button onClick={fetchData}>Click to get test data</button>
        </div>
    );
}

export default Test;