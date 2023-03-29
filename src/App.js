import { useEffect, useState } from 'react'
import './App.scss'
import Home from './components/home/Home'
import { useDispatch } from 'react-redux';
import { loggout } from './redux/login/loginReducer';




function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(()=> {
        const fetchCookies = async() => {
          // if user is not logged in then make logout request 
          // so that the backend send cookie to front-end
          if(!sessionStorage.getItem('user')){
            await dispatch(loggout());
          } 
          setLoading(false);
        }
        fetchCookies();
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