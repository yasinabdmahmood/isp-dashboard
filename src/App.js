import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss'
import Home from './components/home/Home'

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    axios.get('https://isp-system.onrender.com/employees/sign_in'
      ,{
        withCredentials: true
      }).then((response) => {
        setLoading(true)
      console.log('Got Cookie')
    });
    
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