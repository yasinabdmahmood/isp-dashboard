import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.scss'
import Home from './components/home/Home'
import { getEmployees, getClients, getPaymentRecords, getSubscriptionRecords, getSubscriptionTypes} from './redux/database/databaseReducer'
function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getEmployees());
    dispatch(getClients());
    dispatch(getPaymentRecords());
    dispatch(getSubscriptionRecords());
    dispatch(getSubscriptionTypes());
  },[dispatch])
  return (
    <div className="App">
      <Home />
    </div>
  )
}
export default App