import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptionTypes } from '../../redux/database/databaseReducer';

function SubscriptionTypes() {
  const subscriptionTypes = useSelector(state => state.database.subscriptionTypes);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(subscriptionTypes.length === 0){
        dispatch(getSubscriptionTypes())
    }
  })

  return (
        <div className="container d-flex justify-content-center mt-5">
        <table className="table table-striped w-75">
        <thead className="thead-dark" >
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Cost</th>
            <th scope="col">Profit</th>
          </tr>
        </thead>
        <tbody>
          {subscriptionTypes?.map(subscriptionType => (
            <tr key={subscriptionType.id}>
              <td>{subscriptionType.category}</td>
              <td>{subscriptionType.cost}</td>
              <td>{subscriptionType.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionTypes;
