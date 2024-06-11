import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import UserDetails from "./components/UserDetails"
import { TOKEN } from "./utils/util";
import { useEffect, useState } from "react";

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

  return  <div className='h-screen w-screen bg-black text-white flex gap-2 p-2'>
  <Sidebar />
  <Outlet />
  <UserDetails />
</div>
}

export default App
