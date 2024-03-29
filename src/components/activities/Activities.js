import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActivities } from '../../redux/database/databaseReducer';
import Table from 'react-bootstrap/Table';
import { formatDate } from '../../helpers/formatDate';
import CustomPopup from '../helper_components/popup/Popup';



function Activities() {
  const activities = useSelector(state => state.database.activities);

  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const [loadMoreButton, setLoadMoreButton] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (activities.length < 20) {
        const response = await dispatch(getActivities());
        if (!response.type.includes('fulfilled')) {
          alert('Some thing went wrong, please try again !!')
        }
      }
    }
    fetchData();
  }, []);



  const loadMore = async () => {
    const response = await dispatch(getActivities());
    if (response.payload.data.length < 20) {
      setLoadMoreButton(false);
    }
  }

  return (
    <div ref={elementRef} style={{ height: '900px', overflow: 'auto' }}>
      <h1 className='text-start text-black h4 m-4'>Activities</h1>
      <div className="p-sm-3 mt-2">
        <Table striped bordered hover responsive>
          <thead className="thead-dark" >
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Action type</th>
              <th scope="col">Table name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map(activity => (
              <CustomPopup data={activity?.json_data}>
                <tr key={activity?.id}>
                  <td>{activity?.employee_name}</td>
                  <td>{activity?.action_type}</td>
                  <td>{activity?.table_name}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatDate(activity?.created_at)}</td>
                </tr>
              </CustomPopup>
            ))}
          </tbody>
        </Table>
        <div className='my-3' style={{ display: loadMoreButton ? 'block' : 'none' }}>
          <button onClick={loadMore} className='btn btn-sm btn-primary'>Load more</button>
        </div>
      </div>
    </div>
  );
}

export default Activities;