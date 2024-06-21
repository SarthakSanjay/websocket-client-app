import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import UserDetails from "./components/UserDetails"
import { TOKEN } from "./utils/util";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isAuth , setIsAuth] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(TOKEN){
      setIsAuth(true)
    }else{
      setIsAuth(false)
    }

  },[isAuth])
  
  if(!isAuth){
    navigate('/login')
  }
  axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`

  // const headers = new axios.AxiosHeaders();
  // headers.set('Authorization', `Bearer ${TOKEN}`);

  return  <div className='h-screen w-screen bg-black text-white flex gap-2 p-2'>
  <Sidebar />
  <Outlet />
  <UserDetails />
</div>
}

export default App
