import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Template from '../template/Template';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Dashboard from '../dashboard/Dashboard';
import RegUser from '../reg_user/RegUser';
import Employees from '../employees/Employees';
import SubscriptionTypes from '../sunbscription_types/SubscriptionTypes';
import Clients from '../clients/Clients';
import SubscriptionRecords from '../subscription_records/SubscriptionRecords';
import PaymentRecords from '../payment_records/PaymentRecords';
import NewSubscriptionType from '../new_subscription_type/NewSubscriptionType';
import EditSubscriptionType from '../edit_subscription_type/EditSubscriptionType';
import NewClient from '../new_client/NewClient';
import EditClient from '../edit_client/EditClient';
import ShowClient from '../show_client/ShowClient';
function Home() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Template />}>
            <Route index element={<Dashboard/>} />
            <Route path="employees" element={<Employees/>} />
            <Route path="subscriptionTypes" element={<SubscriptionTypes />}/>
            <Route path="subscriptionTypes/new" element={<NewSubscriptionType />} />
            <Route path="subscriptionTypes/edit/:id" element={<EditSubscriptionType />} />
            <Route path="clients" element={<Clients/>} />
            <Route path="clients/:id" element={<ShowClient/>} />
            <Route path="clients/new" element={<NewClient/>} />
            <Route path="clients/edit/:id" element={<EditClient/>} />
            <Route path="subscriptionRecords" element={<SubscriptionRecords/>} />
            <Route path="paymentRecords" element={<PaymentRecords/>} />
            <Route path="reg_user" element={<RegUser/>} />
          </Route>
        </Routes>
    </>

  )
}
export default Home