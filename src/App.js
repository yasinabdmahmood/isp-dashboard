import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.scss'
import Home from './components/home/Home'
import { getEmployees, getClients, getPaymentRecords, getSubscriptionRecords, getSubscriptionTypes} from './redux/database/databaseReducer'
function App() {
  const dispatch = useDispatch();
  useEffect(()=> {
    console.log('MyComponent rendered');
    const fetchData = async() => {
    await dispatch(getEmployees());
    await dispatch(getClients());
    await dispatch(getSubscriptionTypes());
    }
    fetchData()
  },[])
  return (
    <div className="App">
      <Home />
    </div>
  )
}
export default App