import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isAdmin from '../../../helpers/isAdmin';
import Table from 'react-bootstrap/Table';
import styles from './styles.module.scss'
import plusSign from '../../../assets/images/plus-circle.svg'
import edit from '../../../assets/images/pencil-square.svg'
import trash from '../../../assets/images/trash-fill.svg'
import searchLogo from '../../../assets/images/search.svg'

import Reducer from '../../../redux/helpers/reducer';
const {getCompanies, deleteCompany} = Reducer.asyncThunks



function Companies() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const companies = useSelector( state => state.database.companies);
    const dispatch = useDispatch();
    const filterCompanies = (company) => {
        if(company.name.toLowerCase().includes(search.toLowerCase())){
            return true
        }
        return false;
      };
    const handleCompanyDeletion = async(id) => {
        const confirm = window.confirm('Are you sure you want to delete this item')
        if(confirm){
            const response = await dispatch(deleteCompany({id}));
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
        if(companies.length === 0){
            console.log(getCompanies)
            dispatch(getCompanies())
        }
    },[dispatch]);
    return (
        <div className={styles.container}>
            <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                <h3 className='text-start text-black m-4 h4'>Comanies</h3>
                <div className='d-flex  justify-content-center align-items-stretch mx-5'>
                        <div className={styles['search-container']}>
                            <img src={searchLogo} className={styles['search-icon']} style={{background: 'white'}} alt='search' />
                            <input className={styles['search-input']} placeholder='search' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />        
                        </div> 
                </div>
            </div>
           
           <div className="p-sm-3 mt-2">
           <Table striped bordered hover responsive>
               <thead className="thead-dark" >
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {companies?.filter(company => filterCompanies(company)).map(company => (
                        <tr key={company.id}>
                        <td>{company.name}</td>
                        <td className='d-flex justify-content-around align-items-center'>
                        { isAdmin() &&
                            <>
                                    <img src={trash} style={{cursor: 'pointer'}} onClick={()=>{handleCompanyDeletion(company.id)}} className='mx-2'/>
                                    <img src={edit} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/home/companies/edit/${company.id}`)}} className='mx-2'/>
                            </>
                        }
                        </td>
                        </tr>
                    ))}
                </tbody>
      </Table>
    </div>
    { isAdmin() && <div className={styles['plus-sign']}>
            <button onClick={()=> navigate('/home/companies/new')} >
                <img src={plusSign} alt='Add sign' />
            </button>
        </div>
    }
    </div>
    );
}

export default Companies;




