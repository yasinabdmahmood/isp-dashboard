import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/database/databaseReducer';
import { useNavigate } from 'react-router-dom';


function Employees() {
  const employees = useSelector( state => state.database.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    // if the employees list has not been fetched from server before
    // then fetch the list
    if(employees.length === 0)
    {dispatch(getEmployees())}
  },[employees.length]);

  return (
    <div className='d-flex flex-column align-items-center'>
      <div>
        <h1>Employees</h1>
      </div>
      <div className="container d-flex justify-content-center mt-5">
      <table className="table table-striped">
        <thead class="thead-dark" >
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Contact Info</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.employee_contact_information?.[0]?.contact_info || 'N/A'}</td>
              <td>
                <button 
                className='btn btn-sm btn-info'
                onClick={()=> navigate(`/home/profile/${employee.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Employees;