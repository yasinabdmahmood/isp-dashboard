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
import PaymentRecords from '../payment_records/PaymentRecords';
import NewSubscriptionType from '../new_subscription_type/NewSubscriptionType';
import EditSubscriptionType from '../edit_subscription_type/EditSubscriptionType';
import NewClient from '../new_client/NewClient';
import EditClient from '../edit_client/EditClient';
import ShowClient from '../show_client/ShowClient';
import NewSubscriptionRecord from '../new_subscription_record/NewSubscriptionRecord';
import NewPaymentRecord from '../new_payment_record/NewPaymentRecord';
import Profile from '../profile/Profile';
import PaymentHistory from '../payment_history/PaymentHistory';
import SubscriptionRecord from '../subscription_records/SubscriptionRecord';
import EditEmployee from '../edit_employee/EditEmployee';
import FilteredSubscriptionRecords from '../filtered_subscription_records/FilteredSubscriptionRecords';
import UnpaidSubscriptionRecord from '../unpaid_subscription_records/UnpaidSubscriptionRecord';
import EditSubscriptionRecord from '../edit_subscription_record/EditSubscriptionRecord';
import Receipt from '../receipt/Receipt';
import Activities from '../activities/Activities';
import Test from '../test/Test';
import Agents from '../agents/Agents';
function Home() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/receipt" element={<Receipt/>} />
          <Route path="/home" element={<Template />}>
            <Route index element={<Dashboard/>} />
            <Route path="employees" element={<Employees/>} />
            <Route path="employees/edit/:id" element={<EditEmployee/>} />
            <Route path="subscriptionTypes" element={<SubscriptionTypes />}/>
            <Route path="subscriptionTypes/new" element={<NewSubscriptionType />} />
            <Route path="subscriptionTypes/edit/:id" element={<EditSubscriptionType />} />
            <Route path="test" element={<Test/>} />
            <Route path="clients" element={<Clients/>} />
            <Route path="clients/:id" element={<ShowClient/>} />
            <Route path="clients/new" element={<NewClient/>} />
            <Route path="clients/edit/:id" element={<EditClient/>} />
            <Route path="subscriptionRecords" element={<SubscriptionRecord/>} />
            <Route path="subscriptionRecords/edit" element={<EditSubscriptionRecord/>} />
            <Route path="filteredSubscriptionRecords" element={<FilteredSubscriptionRecords/>} />
            <Route path="unpaidSubscriptionRecords" element={<UnpaidSubscriptionRecord/>} />
            <Route path="subscriptionRecords/history" element={<PaymentHistory/>} />
            <Route path="receipt" element={<Receipt/>} />
            <Route path="activities" element={<Activities/>} />
            <Route path="subscriptionRecords/new" element={<NewSubscriptionRecord/>} />
            <Route path="paymentRecords" element={<PaymentRecords/>} />
            <Route path="paymentRecords/new/:id" element={<NewPaymentRecord/>} />
            <Route path="reg_user" element={<RegUser/>} />
            <Route path="profile/:id" element={<Profile/>} />
            <Route path="agents" element={<Agents/>} />
          </Route>
        </Routes>
    </>

  )
}
export default Home