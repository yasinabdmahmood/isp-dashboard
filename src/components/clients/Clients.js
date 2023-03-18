import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClients, deleteClient } from '../../redux/database/databaseReducer';

function Clients() {
    const navigate = useNavigate();
    const clients = useSelector( state => state.database.clients);
    const dispatch = useDispatch();
    useEffect(() => {
        // if the employees list has not been fetched from server before
        // then fetch the list
        if(clients.length === 0){
            dispatch(getClients())
        }
    },[]);
    return (
        <div>
           <div className="container d-flex justify-content-center mt-5">
             <table className="table table-striped w-75">
               <thead className="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.map(client => (
                        <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.username}</td>
                        <td>{client.client_contact_informations[0]?.contact_info || 'No contact information'}</td>
                        <td>
                            <button
                            className='btn btn-sm btn-danger'
                            onClick={()=>{dispatch(deleteClient(client.id))}}
                            >Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
      </table>
    </div>
        <div>
         <button onClick={()=> navigate('/home/clients/new')} className='btn btn-primary'>Create new client</button>
        </div>
        </div>
    );
}

export default Clients;