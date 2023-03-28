import { useEffect } from 'react'
import axios from 'axios'
import './App.scss'
import Home from './components/home/Home'

function App() {
  useEffect(()=> {
    axios.get('https://isp-system.onrender.com/employees/sign_in'
      ,{
        withCredentials: true
      }).then((response) => {
      console.log('Got Cookie')
    });
    
  },[])
  return (
    <div className="App">
      <Home />
    </div>
  )
}
export default App