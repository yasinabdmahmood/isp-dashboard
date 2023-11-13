import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { useParams } from "react-router-dom";
import Reducer from '../../../redux/helpers/reducer';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';

const { getLedgers } = Reducer.asyncThunks;

function LedgerDetail(props) {
    const location = useLocation();
    const ledger = location.state?.ledger;
    //const ledger = useSelector(state => state.database.ledgers.find(ledger => ledger.id === parseInt(id)));

    const dispatch = useDispatch();

    useEffect(() => {
        if(!ledger){
            dispatch(getLedgers());
        }
    },[]);
    return (
        <div className={styles.container}>
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Ledger Detail</h3>
            </div>
            <div className='m-3'>
            <Table striped bordered hover responsive>
                    <thead className="thead-dark" >
                            <tr>
                                <th>Name</th>
                                <td>{ledger.agent.name}</td>
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td>{ledger.agent.info}</td>
                            </tr>
                    </thead>
                </Table>
                <Table striped bordered hover responsive>
                    <thead className="thead-dark" >
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Amount</th>
                            </tr>
                    </thead>
                    <tbody>
                            {  
                               Object.keys(ledger? ledger.detail: {})?.map((type, index) => (
                                    <tr key={index}>
                                        <td>{type}</td>
                                        <td>{ledger.detail[type]}</td>
                                    </tr>
                               
                               ))
                            }
                               

                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="col">Total withdrawed</th>
                            <th scope="col">{ledger?.withdraw}</th>
                        </tr>
                        <tr>
                            <th scope="col">Deposit amount</th>
                            <th scope="col">{ledger?.deposit}</th>
                        </tr>
                    </tfoot>
               </Table>
            </div>
        </div>
    );
}

export default LedgerDetail;