import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss'
import Home from './components/home/Home'
import baseUrl from './redux/baseUrl'

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
        axios.get(baseUrl,{
          withCredentials: true
        }).then(()=>{
          setLoading(false)
        })
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