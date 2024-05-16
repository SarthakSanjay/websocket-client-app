import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Friend {
    friend:{
        id: number,
        username:string
    }
}
const Sidebar = () => {
    const [user , setUser] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/friend/all`).then((res) => {
            console.log(res.data.friends)
            setUser(res.data.friends)
        })

    },[])
  return (
    <div className='h-full w-1/4 text-white border-r flex flex-col items-center py-14'>
        {
            user.map((u: Friend)=>{
                return <Link key={u.friend.id} className='w-full' to={`/${u.friend.id}`}>
                            <div className='h-14 w-full px-10 border text-xl flex items-center bg-violet-900/30 '>
                                 {u.friend.username}
                            </div>
                        </Link>
            })
        }
    </div>
  )
}

export default Sidebar