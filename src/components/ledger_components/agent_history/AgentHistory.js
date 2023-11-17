import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAgentHistory } from '../../../redux/database/databaseReducer';
import isAdmin from '../../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import styles from './styles.module.scss';
import plusSign from '../../../assets/images/plus-circle.svg';
import edit from '../../../assets/images/pencil-square.svg';
import trash from '../../../assets/images/trash-fill.svg';
import view from '../../../assets/images/eye-fill.svg';
import plus from '../../../assets/images/plus-circle-fill.svg';
import Reducer from '../../../redux/helpers/reducer';
const { deleteLedger, getAgentHistory} = Reducer.asyncThunks

function AgentHistory() {
    const navigate = useNavigate();
    const location = useLocation();
    const agent = location.state?.agent;
    const ledgers = useSelector( state => state.database.agentHistory);
    const dispatch = useDispatch();

    const handleLedgerDeletion = async(id) => {
        const confirm = window.confirm('Are you sure you want to delete this client')
        if(confirm){
            const response = await dispatch(deleteLedger({id}));
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
      dispatch(getAgentHistory({id: agent.id}));
      return ()=>{
        dispatch(clearAgentHistory());
      }
    },[dispatch]);
    return (
        <div className={styles.container}>
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Agent history</h3>   
            </div>
           
           <div className="p-sm-3 mt-2">
           <Table striped bordered hover responsive>
                <thead className="thead-dark" >
                        <tr>
                            <th>Name</th>
                            <td>{agent.name}</td>
                        </tr>
                        <tr>
                            <th>Info</th>
                            <td>{agent.info}</td>
                        </tr>
                </thead>
            </Table>
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
                    {ledgers?.map(ledger => (
                        <tr key={ledger.id}>
                        <td>{ledger.agent.name}</td>
                        <td>{ledger.withdraw}</td>
                        <td>{ledger.deposit}</td>
                        <td>{ledger.date}</td>
                        <td className='d-flex justify-content-around align-items-center'>
                        { isAdmin() &&
                            <>
                                    <img src={trash} style={{cursor: 'pointer'}} onClick={()=>{handleLedgerDeletion(ledger.id)}} className='mx-2'/>
                                    {/* <img src={edit} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/clients/edit/${ledger.id}`)}} className='mx-2'/> */}
                            </>
                        }
                          <img src={view} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/ledgers/display`,{state: {ledger}})}} className='mx-2'/>
                          <img src={plus} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/ledgers/add_deposit`,{state: {ledger}})}} className='mx-2'/>
                           
                        </td>
                        </tr>
                    ))}
                </tbody>
      </Table>
    </div>
    { isAdmin() && <div className={styles['plus-sign']}>
            <button onClick={()=> navigate('/home/ledgers/new')} >
                <img src={plusSign} alt='Add sign' />
            </button>
        </div>
    }
    </div>
    );
}

export default AgentHistory ;