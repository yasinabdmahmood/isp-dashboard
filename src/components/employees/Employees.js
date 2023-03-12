import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employees() {
    const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000',{
        withCredentials: true
      })
      .then(response => {setEmployees(response.data);
    console.log(response.data)})
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <table className="table table-striped w-75">
        <thead class="thead-dark" >
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} scope="row">
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.employee_contact_information?.[0]?.contact_info || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;