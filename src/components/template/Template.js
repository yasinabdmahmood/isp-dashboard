import React, { useState } from 'react';
import styles from './template.module.scss'
import logo from '../../assets/images/ispicon.png'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggout } from '../../redux/login/loginReducer';
import { Outlet, Link  } from 'react-router-dom';
import list from '../../assets/images/list.svg'
import isAdmin from '../../helpers/isAdmin';




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
  });
  
  const collapseSidebar = () => {
    setSidebarStyle((prevState) => ({
      ...prevState,
      width: prevState.width === '250px' ? '0' : '250px',
    }));
  };
  
  
  const handleLogout = async () => {
    try {
      await dispatch(loggout());
      console.log('clearing session');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <div className={styles["container"]}>
        <div className={styles["scssClass"]}>
          <div className={styles["hamberger-icon"]}>
            <img src={list} alt="icon" onClick={() => collapseSidebar()} />
          </div>

          <h3>{`Welcome ${getUserName()}`}</h3>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
        <div className={styles.body}>
          <div className={styles['sidebar-container']}>
          <Sidebar  backgroundColor= 'rgb(255, 255, 255)' rootStyles={sidebarStyle}>
            <Menu>
              { isAdmin() && <MenuItem component={<Link to="/home" />}>Dashboard</MenuItem>}
              <MenuItem component={<Link to="/home/paymentRecords" />} > Payment History </MenuItem>
              <MenuItem component={<Link to="/home/subscriptionTypes" />} > Subscription Types </MenuItem>
              <MenuItem component={<Link to="/home/clients" />} > Users </MenuItem>
              <SubMenu label="Records">
                <MenuItem component={<Link to="/home/subscriptionRecords" />} > Subscription Records </MenuItem>
              </SubMenu>
              <MenuItem component={<Link to={`/home/profile/${JSON.parse(sessionStorage.getItem('user')).id}`} />} > Profile </MenuItem>
              { isAdmin() && <MenuItem component={<Link to="/home/employees" />} > Employees </MenuItem>}
            </Menu>
            <div className={styles['logo-container']}>
              <img src={logo} alt="icon"/>
            </div>
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