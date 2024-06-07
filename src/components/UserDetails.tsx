import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TOKEN } from "../utils/util"
import { User } from "./SearchModal"

const UserDetails = () => {
  const [user, setUser] = useState<User>({id:0,username:'',email:''})
  const {id} = useParams()

  useEffect(()=>{
    async function fetchUserDetails() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`,{
        headers:{
          Authorization: `Bearer ${TOKEN}`
        }
      })
      setUser(res.data.user)

    }
    fetchUserDetails()
  },[])
  return (
    <div className="h-1/2 w-[30%]  bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-3xl p-3">
        <span className="text-black text-2xl p-2">{user.username}</span>
    </div>
  )
}

export default UserDetails