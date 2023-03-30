import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import isAdmin from '../../helpers/isAdmin';
import { createEmployeeContactInfo, deleteEmployeeContactInfo, getEmployees } from '../../redux/database/databaseReducer';
import styles from './styles.module.scss'

function Profile() {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {id} = useParams();

    const user = useSelector(state => state.database.employees.find( employee => employee.id === parseInt(id)));

    useEffect(()=>{
            if(!user){
                dispatch(getEmployees());
            }
    },[]);


    const handleSubmit = async (event) => {
        const payloadData = {
            employee_id: id,
            contact_info: inputValue,
        }
        event.preventDefault();
        await dispatch(createEmployeeContactInfo(payloadData));
        await dispatch(getEmployees());
        setInputValue('');
    }

    const handleDletion = async (id) => {
    const payloadData = {id}
    const confirm = window.confirm('Are you sure you want to delete this item')
    if(confirm){
    await dispatch(deleteEmployeeContactInfo(payloadData));
    }
    else{
        return;
    }
    dispatch(getEmployees());
    }

    if (!user) {
        return <div>Loading...</div>;
      }


    return (
        <div className={styles.container}>
            <h1>Profile {id} </h1>
            <div>
                <ul>
                    <li>
                        <span>Name: </span>
                        <span>{user.name}</span>
                    </li>
                    <li>
                        <span>Email: </span>
                        <span>{user.email}</span>
                    </li>
                    <li>
                        <span>Role: </span>
                        <span>{user.role}</span>
                    </li>
                    <li>
                        <span>Contact info: </span>
                        <ul>
                            {user.employee_contact_information.map( cl => {
                                return (
                                    <li key={cl.id}>
                                        <span>{cl.contact_info}</span>
                                        <button 
                                        onClick={()=>handleDletion(cl.id)}
                                        className='btn btn-sm btn-danger'
                                        >Remove
                                        </button>
                                    </li>
                                )
                            }
                                
                            )}
                        </ul>
                    </li>
                    <li>
                    <form className="form-inline d-flex" onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="inputField" className="m-1">Add contact info</label>
                        <input type="text" className="" id="inputField" placeholder="Enter text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary mx-1">Add</button>
                    </form>
                    </li>
                </ul>
            </div>
            <div>
                { isAdmin() && <button
                className='btn btn-secondary'
                onClick={()=> navigate(`/home/employees/edit/${id}`)}>
                    Edit
                </button>
                }
            </div>
        </div>
    );
}

export default Profile;