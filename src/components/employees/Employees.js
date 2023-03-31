import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../../redux/database/databaseReducer';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


function Employees() {
  const employees = useSelector(state => state.database.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    // if the employees list has not been fetched from server before
    // then fetch the list
    if(employees.length === 0)
    {dispatch(getEmployees())}
  },[]);

  return (
    <div className='d-flex flex-column '>
      <div className='d-flex justify-content-center align-items-center'>
        <h1 className='text-center text-primary' >Employees</h1>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-stretch mt-5">
      <Table striped bordered hover responsive>
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
      </Table>
    </div>
    <div>
      <div className='px-3'>
        <button 
        className='btn btn-primary'
        onClick={()=>navigate("/home/reg_user")}>Create new employee
        </button>
      </div>
    </div>
    </div>
  );
}

export default Employees;