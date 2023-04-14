import React, { useState } from 'react';
import styles from './template.module.scss'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggout } from '../../redux/login/loginReducer';
import { Outlet, Link  } from 'react-router-dom';
import list from '../../assets/images/list.svg'
import isAdmin from '../../helpers/isAdmin';
import logoutLogo from '../../assets/images/box-arrow-right.svg'




function Template() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserName = () => {
    let loggedInEmployee = sessionStorage.getItem('user');
    let retrievedData = JSON.parse(loggedInEmployee);
    return retrievedData.name
  }
  const [sidebarStyle, setSidebarStyle] = useState({
    minWidth: 'unset',
    width: '250px',
    maxHeight:  'calc(100vh - 58px)',
    minHeight:  'calc(100vh - 58px)',
    transition: 'width 0.3s ease-in-out',
    color: 'white',
  });
  const linkStyle = {
    backgroundColor: 'rgb(40,40,40)',
    ':hover': {
      color: 'black',
    },
  }

  
  const collapseSidebar = () => {
    setSidebarStyle((prevState) => ({
      ...prevState,
      width: prevState.width === '250px' ? '0' : '250px',
    }));
  };
  
  
  const handleLogout = async () => {
    try {
      await dispatch(loggout());
      navigate('/');
    } catch (error) {
      // console.log(error);
    }
  }
    return (
        <div className={styles["container"]}>
        <div className={styles["scssClass"]}>
          <div className={styles["hamberger-icon"]}>
            <img src={list} alt="icon" onClick={() => collapseSidebar()} />
          </div>
          <div className='d-flex align-items-center'>
          <span className='fw-bold mx-2 my-1'>{`Welcome ${getUserName()}`}</span>
          <img src={logoutLogo} alt="icon" onClick={handleLogout} className={styles['logout-logo']} /> 
          </div>

          
        </div>
        <div className={styles.body}>
          <div className={styles['sidebar-container']}>
          <Sidebar  backgroundColor= 'rgb(40,40,40)' rootStyles={sidebarStyle}>
            <Menu>
              { isAdmin() && <MenuItem component={<Link to="/home" />} rootStyles={linkStyle}>Dashboard</MenuItem>}
              <MenuItem component={<Link to="/home/paymentRecords" />} rootStyles={linkStyle}> Payment History </MenuItem>
              <MenuItem component={<Link to="/home/subscriptionTypes"/>} rootStyles={linkStyle}> Subscription Types </MenuItem>
              <MenuItem component={<Link to="/home/clients" />} rootStyles={linkStyle}> Users </MenuItem> 
              <MenuItem component={<Link to="/home/subscriptionRecords" />} rootStyles={linkStyle}> Subscription Records </MenuItem>
              {/* <MenuItem component={<Link to="/home/filteredSubscriptionRecords" />} rootStyles={linkStyle}> Filtered Subscription Records </MenuItem> */}
              <MenuItem component={<Link to={`/home/profile/${JSON.parse(sessionStorage.getItem('user')).id}`} />} rootStyles={linkStyle}> Profile </MenuItem>
              { isAdmin() && <MenuItem component={<Link to="/home/employees" />} rootStyles={linkStyle}> Employees </MenuItem>}
            </Menu>
          </Sidebar>
          </div>
          
          <div className={styles['main-container']} style={{flexGrow: '1'}}>
             <Outlet />
          </div>   
        </div>
      </div>
    );
}

export default Template;