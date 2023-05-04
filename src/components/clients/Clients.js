import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, deleteClient } from '../../redux/database/databaseReducer';
import isAdmin from '../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import styles from './styles.module.scss'
import plusSign from '../../assets/images/plus-circle.svg'
import edit from '../../assets/images/pencil-square.svg'
import trash from '../../assets/images/trash-fill.svg'
import view from '../../assets/images/eye-fill.svg'
import searchLogo from '../../assets/images/search.svg'

function Clients() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const clients = useSelector( state => state.database.clients);
    const dispatch = useDispatch();
    const filterClients = (client) => {
        const isClintName = client.name.toLowerCase().includes(search.toLowerCase());
        const isClintUsername = client.username.toLowerCase().includes(search.toLowerCase());
        const isClientContactInfo = client.client_contact_informations.some( contact => contact?.contact_info?.toLowerCase().includes(search.toLowerCase()));
        if(isClientContactInfo || isClintName || isClintUsername){
            return true
        }
        return false;
      };
    const handleClientDeletion = async(id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if(confirm){
            const response = await dispatch(deleteClient(id));
            if(response.type.includes('fulfilled')){
                window.alert('Item was deleted successfully');
            }
            else{
                window.alert('Failed to delete the item, please try again')
            }
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
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Users</h3>
                <div className='d-flex  justify-content-center align-items-stretch mx-5'>
                        <div className={styles['search-container']}>
                            <img src={searchLogo} className={styles['search-icon']} style={{background: 'white'}} alt='search' />
                            <input className={styles['search-input']} placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />        
                        </div> 
                </div>
            </div>
           
           <div className="p-sm-3 mt-2">
           <Table striped bordered hover responsive>
               <thead className="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Coordinate</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.filter(client => filterClients(client)).map(client => (
                        <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.username}</td>
                        <td>{client.client_contact_informations[0]?.contact_info || 'No contact information'}</td>
                        <td>{client?.coordinate || 'N/A'}</td>
                        <td className='d-flex justify-content-around align-items-center'>
                        { isAdmin() &&
                            <>
                                    <img src={trash} style={{cursor: 'pointer'}} onClick={()=>{handleClientDeletion(client.id)}} className='mx-2'/>
                                    <img src={edit} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/clients/edit/${client.id}`)}} className='mx-2'/>
                            </>
                        }
                          <img src={view} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/clients/${client.id}`)}} className='mx-2'/>
                           
                        </td>
                        </tr>
                    ))}
                </tbody>
      </Table>
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