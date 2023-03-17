import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSubscriptionTypes, deleteSubscriptionType } from '../../redux/database/databaseReducer';

function SubscriptionTypes() {
  const subscriptionTypes = useSelector(state => state.database.subscriptionTypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeletion = (id) => {
    dispatch(deleteSubscriptionType(id))
  }
  useEffect(()=>{
    if(subscriptionTypes.length === 0){
        dispatch(getSubscriptionTypes())
    }
  })

  return (
        <div className="container d-flex flex-column justify-content-center mt-5">
        <table className="table table-striped w-75">
        <thead className="thead-dark" >
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Cost</th>
            <th scope="col">Profit</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptionTypes?.map(subscriptionType => (
            <tr key={subscriptionType.id}>
              <td>{subscriptionType.category}</td>
              <td>{subscriptionType.cost}</td>
              <td>{subscriptionType.profit}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className='btn btn-primary'
        onClick={() => navigate('/home/subscriptionTypes/new')}>Create new Subscription type</button>
      </div>
      
    </div>
  );
}

export default SubscriptionTypes;
