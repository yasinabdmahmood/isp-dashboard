import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, deleteClient } from '../../../redux/database/databaseReducer';
import isAdmin from '../../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import styles from './styles.module.scss';
import plusSign from '../../../assets/images/plus-circle.svg';
import edit from '../../../assets/images/pencil-square.svg';
import trash from '../../../assets/images/trash-fill.svg';
import view from '../../../assets/images/eye-fill.svg';
import plus from '../../../assets/images/plus-circle-fill.svg';
import searchLogo from '../../../assets/images/search.svg';
import Reducer from '../../../redux/helpers/reducer';
const { getLedgers, deleteLedger } = Reducer.asyncThunks

function Ledgers() {
    const [search, setSearch] = useState('');
    const [loadMoreButton, setLoadMoreButton] = useState(true);
    const navigate = useNavigate();
    const clients = useSelector(state => state.database.clients);
    const ledgers = useSelector(state => state.database.ledgers);
    const dispatch = useDispatch();
    const filterAgents = (ledger) => {
        const isAgentName = ledger?.agent?.name.toLowerCase().includes(search.toLowerCase());
        if (isAgentName) {
            return true
        }
        return false;
    };
    const handleLedgerDeletion = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if (confirm) {
            const response = await dispatch(deleteLedger({ id }));
            if (response.type.includes('fulfilled')) {
                window.alert('Item was deleted successfully');
            }
            else {
                window.alert('Failed to delete the item, please try again')
            }
        }
        else {
            return;
        }

    }
    useEffect(() => {
        // if the employees list has not been fetched from server before
        // then fetch the list
        if (clients.length === 0) {
            dispatch(getClients())
        }
        if (ledgers.length === 0) {
            dispatch(getLedgers())
        }
    }, [dispatch]);

    const loadMore = async () => {
        const id = ledgers[ledgers.length - 1].id;
        const responce = await dispatch(getLedgers({id}));

        if (responce.payload.data.length < 5) {
            setLoadMoreButton(false);
        }
    }
    return (
        <div className={styles.container}>
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Ledgers</h3>
                <div className='d-flex  justify-content-center align-items-stretch mx-5'>
                    <div className={styles['search-container']}>
                        <img src={searchLogo} className={styles['search-icon']} style={{ background: 'white' }} alt='search' />
                        <input className={styles['search-input']} placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="p-sm-3 mt-2">
                <Table striped bordered hover responsive>
                    <thead className="thead-dark" >
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Withdraw</th>
                            <th scope="col">Deposit</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgers?.filter(ledger => filterAgents(ledger)).map(ledger => (
                            <tr key={ledger.id}>
                                <td>{ledger.agent.name}</td>
                                <td>{ledger.withdraw}</td>
                                <td>{ledger.deposit}</td>
                                <td>{ledger.date}</td>
                                <td className='d-flex justify-content-around align-items-center'>
                                    {isAdmin() &&
                                        <>
                                            <img src={trash} style={{ cursor: 'pointer' }} onClick={() => { handleLedgerDeletion(ledger.id) }} className='mx-2' />
                                            <img src={edit} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/home/clients/edit/${ledger.id}`) }} className='mx-2' />
                                        </>
                                    }
                                    <img src={view} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/home/ledgers/display`, { state: { ledger } }) }} className='mx-2' />
                                    <img src={plus} style={{ cursor: 'pointer' }} onClick={() => { navigate(`/home/ledgers/add_deposit`, { state: { ledger } }) }} className='mx-2' />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className='my-3' style={{ display: loadMoreButton ? 'block' : 'none' }}>
                <button onClick={loadMore} className='btn btn-sm btn-primary'>Load more</button>
            </div>
            {isAdmin() && <div className={styles['plus-sign']}>
                <button onClick={() => navigate('/home/ledgers/new')} >
                    <img src={plusSign} alt='Add sign' />
                </button>
            </div>
            }
        </div>
    );
}

export default Ledgers;