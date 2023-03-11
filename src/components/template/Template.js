import React from 'react';
import styles from './template.module.scss'
import parking from '../../assets/images/parking.png'
import logo from '../../assets/images/parking-area.png'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Outlet, Link  } from 'react-router-dom';

function Template() {
    return (
        <div className={styles["container"]}>
        <div className={styles["scssClass"]}>
          <h3>React Js SASS / SCSS Example</h3>
        </div>
        <div className={styles.body} style={{
          display: 'flex',
          alignItems: 'stretch',
        }}>
          <Sidebar breakPoint='sm' image={parking} >
            <Menu>
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
              <img src={logo}/>
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