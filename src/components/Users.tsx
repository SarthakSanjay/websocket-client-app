import { useEffect, useState } from "react"
import UserChat from "./UserChat"
import axios from "axios"
import { TOKEN } from "../utils/util"

const Users = () => {
  const [friends , setFriends] = useState([])
  console.log('friends',friends);
  useEffect(()=>{
    async function getFriends() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/friend/all`,{
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })
      setFriends(res.data.friends)
    }
    getFriends()
  },[])
  return (
    <div className="h-[95%] w-full ">
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
        <UserChat />
    </div>
  )
}

export default Users