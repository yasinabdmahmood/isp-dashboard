import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, deleteClient } from '../../redux/database/databaseReducer';
import isAdmin from '../../helpers/isAdmin';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'


function Clients() {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('name');
    const navigate = useNavigate();
    const clients = useSelector( state => state.database.clients);
    const dispatch = useDispatch();
    const filterClients = (client) => {
        if (searchType === 'name' && client.name.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'username' && client.username.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        if (searchType === 'phone' && client.client_contact_informations[0]?.contact_info?.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      };
    const handleClientDeletion = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if(confirm){
            dispatch(deleteClient(id));
        }
        else{
            return;
        }
        
    }
    useEffect(() => {
        // if the employees list has not been fetched from server before
        // then fetch the list
        if(clients.length === 0){
            dispatch(getClients())
        }
    },[dispatch]);
    return (
        <div className={styles.container}>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='mx-3'>Users</h3>
                <div className='d-flex  justify-content-center align-items-center mx-5'>
                    <div className='m-1'>
                    <span>Search by</span>
                        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="username">Username</option>
                            <option value="phone">Phone Number</option>
                        </select>
                    </div>
                    <div className='m-1'>
                        <span>Search</span>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                        
                </div>
            </div>
           
           <div className="container d-flex justify-content-center mt-2">
             <table className="table table-striped">
               <thead className="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.filter(client => filterClients(client)).map(client => (
                        <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.username}</td>
                        <td>{client.client_contact_informations[0]?.contact_info || 'No contact information'}</td>
                        <td>
                        { isAdmin() &&
                            <>
                                <button
                                    className='btn btn-sm btn-danger m-1'
                                    onClick={()=>{handleClientDeletion(client.id)}}
                                    >
                                    Delete
                                    </button>
                                    <button
                                    className='btn btn-sm btn-secondary m-1'
                                    onClick={()=>{navigate(`/home/clients/edit/${client.id}`)}}
                                    >
                                    Edit
                                    </button>
                                </>
                        }
                            <button
                            className='btn btn-sm btn-info m-1'
                            onClick={()=>{navigate(`/home/clients/${client.id}`)}}
                            >
                             View
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
      </table>
    </div>
    { isAdmin() && <div className={styles['plus-sign']}>
            <button onClick={()=> navigate('/home/clients/new')} >
                <img src={plusSign} alt='Add sign' />
            </button>
        </div>
    }
    </div>
    );
}

export default Clients;