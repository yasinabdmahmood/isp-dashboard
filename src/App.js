import { useEffect, useState } from 'react'
import './App.scss'
import Home from './components/home/Home'
import { useDispatch, useSelector } from 'react-redux';
import { loggout } from './redux/login/loginReducer';
import { getClients, getEmployees, getSubscriptionTypes } from './redux/database/databaseReducer';
import { setLoading } from './redux/app-state/appState';




function App() {
  
  const loading = useSelector( state => state.appState.loading)
  const dispatch = useDispatch();
  
  useEffect(()=> {
        dispatch(setLoading(true));
        const fetchCookies = async() => {
          // if user is not logged in then make logout request 
          // so that the backend send cookie to front-end
          if(!sessionStorage.getItem('user')){
            await dispatch(loggout());
          }
          else{
            await dispatch(getEmployees());
            await dispatch(getClients());
            await dispatch(getSubscriptionTypes());
          }
          setLoading(false);
          dispatch(setLoading(false));
        }
        fetchCookies();
  },[])
  
  return (
    <div className="App">
      <Home />
    </div>
  )
}
export default App