import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import UserDetails from "./components/UserDetails"

function App() {

  return (
    <div className='h-screen w-screen bg-black text-white flex gap-2 p-2'>
        <Sidebar />
        <Outlet />
        <UserDetails />
    </div>
  )
}

export default App
