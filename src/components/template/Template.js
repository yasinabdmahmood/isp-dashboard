import React, { useState } from 'react';
import styles from './template.module.scss'
import logo from '../../assets/images/ispicon.png'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loggout } from '../../redux/login/loginReducer';
import { Outlet, Link  } from 'react-router-dom';
import list from '../../assets/images/list.svg'

const getUserName = () => {
  let loggedInEmployee = sessionStorage.getItem('user');
  let retrievedData = JSON.parse(loggedInEmployee);
  return retrievedData.name
}

function Template() {
  // const { collapseSidebar } = useProSidebar();
  const [sidebarStyle, setSidebarStyle] = useState({
    minWidth: 'unset',
    width: '250px',
    transition: 'width 0.3s ease-in-out',
  });
  
  const collapseSidebar = () => {
    setSidebarStyle((prevState) => ({
      ...prevState,
      width: prevState.width === '250px' ? '0' : '250px',
    }));
  };
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <div className={styles.body} style={{
          display: 'flex',
          alignItems: 'stretch',
        }}>
          <Sidebar  backgroundColor= 'rgb(255, 255, 255)' rootStyles={sidebarStyle}>
            <Menu>
              <MenuItem component={<Link to="/home/employees" />} > Employees </MenuItem>
              <MenuItem component={<Link to="/home/subscriptionTypes" />} > Subscription Types </MenuItem>
              <MenuItem component={<Link to="/home" />}>Dashboard</MenuItem>
              <SubMenu label="Vehicle Catagory">
                <MenuItem component={<Link to="/home/add_category" />}>Add Category</MenuItem>
                <MenuItem component={<Link to="/home/manage_category" />}>Manage Category</MenuItem>
              </SubMenu>
              <MenuItem component={<Link to="/home/add_vehicle" />} > Add Vehicle </MenuItem>
              <SubMenu label="Manage Vehicle">
                <MenuItem component={<Link to="/home/manage_in_vehicle" />}>Manage In Vehicle</MenuItem>
                <MenuItem component={<Link to="/home/manage_out_vehicle" />}>Manage Out Vehicle</MenuItem>
              </SubMenu>
              <SubMenu label="Reports">
                <MenuItem component={<Link to="/home/between_dates_report" />}>Between Dates Reports</MenuItem>
              </SubMenu>
              <MenuItem component={<Link to="/home/search_vehicle" />}> Search Vehicle </MenuItem>
              <MenuItem component={<Link to="/home/reg_user" />}> Reg Users </MenuItem>
            </Menu>
            <div className={styles['logo-container']}>
              <img src={logo} alt="icon"/>
            </div>
          </Sidebar>
          <div style={{flexGrow: '1'}}>
             <Outlet />
          </div>   
        </div>
      </div>
    );
}

export default Template;