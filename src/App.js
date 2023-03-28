import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss'
import Home from './components/home/Home'
import { useDispatch } from 'react-redux';
import { loggout } from './redux/login/loginReducer';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(()=> {
        // axios.get('https://isp-system.onrender.com/employees/sign_in',{
        //   withCredentials: true
        // }).then(()=>{
        //   setLoading(false)
        // })
        dispatch(loggout());
  },[])
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <Home />
    </div>
  )
}
export default App