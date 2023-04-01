import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isAdmin from '../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import { getSubscriptionTypes, deleteSubscriptionType } from '../../redux/database/databaseReducer';
import edit from '../../assets/images/pencil-square.svg'
import trash from '../../assets/images/trash-fill.svg'

function SubscriptionTypes() {
  const subscriptionTypes = useSelector(state => state.database.subscriptionTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeletion = async(id) => {
    const confirm = window.confirm('Are you sure you want to delete this subscruption type');
    if(confirm){
      const response =  await dispatch(deleteSubscriptionType(id));
      if(response.type.includes('fulfilled')){
        window.alert('The item was deleted successfully')
      }else{
        window.alert('Failed to delete the item')
      }
    }else{
      return;
    }
    
  }
  useEffect(()=>{
    if(subscriptionTypes.length === 0){
        dispatch(getSubscriptionTypes())
    }
  })

  return (
  <div className='d-flex flex-column justify-content-between align-items-stretch'>
    <div>
      <h1 className='text-start text-black h4 m-4'>Subscription Types</h1>
    </div>
    <div className="p-sm-3 mt-2">
      <Table striped bordered hover responsive>

        <thead className="thead-dark" >
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
           { isAdmin() && <th scope="col">Profit</th> }
           { isAdmin() && <th scope="col">Actions</th> }
          </tr>
        </thead>
        <tbody>
          {subscriptionTypes?.map(subscriptionType => (
            <tr key={subscriptionType.id}>
              <td>{subscriptionType.category}</td>
              <td>{subscriptionType.cost}</td>
              { isAdmin() && <td>{subscriptionType.profit}</td> }
              { isAdmin() && <td className='d-flex justify-content-around'>
                <img src={trash} alt='delete' onClick={() => handleDeletion(subscriptionType.id)} className='mx-2' />
                <img src={edit} alt='edit'  onClick={() => navigate(`/home/subscriptionTypes/edit/${subscriptionType.id}`)} className='mx-2' />
                {/* <button 
                className='btn btn-sm btn-danger m-1'
                onClick={() => handleDeletion(subscriptionType.id)}>
                  Delete
                </button>
                <button 
                className='btn btn-sm btn-secondary m-1'
                onClick={() => navigate(`/home/subscriptionTypes/edit/${subscriptionType.id}`)}
                >
                  Edit
                </button> */}
              </td> }
            </tr>
          ))}
        </tbody>
      </Table>
      { isAdmin() && <div>
        <button className='btn btn-primary'
        onClick={() => navigate('/home/subscriptionTypes/new')}>Create new Subscription type</button>
      </div>
      }
      
      
    </div>
  </div>
        
  );
}

export default SubscriptionTypes;
