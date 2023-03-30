import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isAdmin from '../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import { getSubscriptionTypes, deleteSubscriptionType } from '../../redux/database/databaseReducer';

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
      <h1 className='text-center text-primary h2 m-4'>Subscription Types</h1>
    </div>
    <div className="container d-flex flex-column justify-content-center align-items-stretch mt-5">
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
              { isAdmin() && <td>
                <button 
                className='btn btn-sm btn-danger m-1'
                onClick={() => handleDeletion(subscriptionType.id)}>
                  Delete
                </button>
                <button 
                className='btn btn-sm btn-secondary m-1'
                onClick={() => navigate(`/home/subscriptionTypes/edit/${subscriptionType.id}`)}
                >
                  Edit
                </button>
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
