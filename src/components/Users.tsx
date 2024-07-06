import { useEffect, useState } from "react"
import UserChat from "./UserChat"
import axios from "axios"
import { TOKEN } from "../utils/util"
import { User } from "../types/common"

interface friend {
  friend: User
}

const Users = () => {
  const [friends , setFriends] = useState([])

  useEffect(()=>{
    async function getFriends() {
      const res = await axios.get(`/friend/all`,{
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
      {
        friends.map((user:friend)=>{
          return <UserChat key={user.friend.id} user={user.friend} />
        })
      }
        
    </div>
  )
}

export default Users