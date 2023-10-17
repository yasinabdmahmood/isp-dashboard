import React from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAgents, getTestData } from '../../redux/database/databaseReducer';

function Test() {

    const testData = useSelector( state => state.database?.agents?.data);
    const dispatch = useDispatch();

    const fetchCompanies = () => {
        const payload = {requested_data: 'company'};
        dispatch(getTestData(payload))
    }

    const fetchAgents = () => {
        const payload = {requested_data: 'agent'};
        dispatch(getAgents())
    }

    const fetchLedgers = () => {
        const payload = {requested_data: 'ledger'};
        dispatch(getTestData(payload))
    }
    return (
        <div>
            <h1>This is test page</h1>
            <h2>{testData || "No data has been fetched yes"}</h2>
            <button onClick={fetchAgents}>Fetch agents</button>
            <button onClick={fetchCompanies}>Fetch companies</button>
            <button onClick={fetchLedgers}>Fetch ledgers</button> 
        </div>
    );
}

export default Test;