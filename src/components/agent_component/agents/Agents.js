import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isAdmin from '../../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import styles from './styles.module.scss'
import plusSign from '../../../assets/images/plus-circle.svg'
import edit from '../../../assets/images/pencil-square.svg'
import trash from '../../../assets/images/trash-fill.svg'
import view from '../../../assets/images/eye-fill.svg'
import searchLogo from '../../../assets/images/search.svg'

import Reducer from '../../../redux/helpers/reducer';
const {getAgents, deleteAgent} = Reducer.asyncThunks



function Agents() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const agents = useSelector( state => state.database.agents);
    const dispatch = useDispatch();
    const filterAgents = (agent) => {
        if(agent.name.toLowerCase().includes(search.toLowerCase())){
            return true
        }
        return false;
      };
    const handleAgentDeletion = async(id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if(confirm){
            const response = await dispatch(deleteAgent({id}));
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
        if(agents.length === 0){
            console.log(getAgents)
            dispatch(getAgents())
        }
    },[dispatch]);
    return (
        <div className={styles.container}>
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Agents</h3>
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
                        <th scope="col">Info</th>
                    </tr>
                </thead>
                <tbody>
                    {agents?.filter(agent => filterAgents(agent)).map(agent => (
                        <tr key={agent.id}>
                        <td>{agent.name}</td>
                        <td>{agent.info}</td>
                        <td className='d-flex justify-content-around align-items-center'>
                        { isAdmin() &&
                            <>
                                    <img src={trash} style={{cursor: 'pointer'}} onClick={()=>{handleAgentDeletion(agent.id)}} className='mx-2'/>
                                    <img src={edit} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/clients/edit/${agent.id}`)}} className='mx-2'/>
                            </>
                        }
                          <img src={view} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/clients/${agent.id}`)}} className='mx-2'/>
                           
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

export default Agents;




