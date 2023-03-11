import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Template from '../template/Template';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Dashboard from '../dashboard/Dashboard';
import AddVehicle from '../add_vehicle/AddVehicle';
import ManageInVehicle from '../manage_in_vehicle/ManageInVehicle'
import ManageOutVehicle from '../manage_out_vehicle/ManageOutVehicle'
import AddCategory from '../add_category/AddCategory'
import ManageCategory from '../manage_category/ManageCategory'
import BetweenDatesReport from '../between_dates_report/BetweenDatesReport'
import SearchVehicle from '../search_vehicle/SearchVehicle';
import RegUser from '../reg_user/RegUser';
function Home() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Template />}>
            <Route index element={<Dashboard/>} />
            <Route path="add_vehicle" element={<AddVehicle/>} />
            <Route path="manage_in_vehicle" element={<ManageInVehicle/>} />
            <Route path="manage_out_vehicle" element={<ManageOutVehicle/>} />
            <Route path="add_category" element={<AddCategory/>} />
            <Route path="manage_category" element={<ManageCategory/>} />
            <Route path="search_vehicle" element={<SearchVehicle/>} />
            <Route path="between_dates_report" element={<BetweenDatesReport/>} />
            <Route path="reg_user" element={<RegUser/>} />
          </Route>
        </Routes>
    </>

  )
}
export default Home