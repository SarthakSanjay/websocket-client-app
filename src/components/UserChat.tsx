import React, { useEffect, useState } from "react"
import { User } from "./SearchModal"
import { Link, useParams } from "react-router-dom"
import { convertToUppercase } from "../utils/util"

interface UserChatProp {
  user: User
}
const UserChat :React.FC<UserChatProp> = ({user}) => {
  const [active , setActive] = useState(false)
  const {id} = useParams()
  useEffect(()=>{
    if(id === user.id.toString()){
      setActive(true)
    }

    return () =>{
      setActive(false)
    }
  },[id , user.id])
  return (
   <Link to={`/home/user/${user.id}`}>
       <div className={`h-16 w-full hover:bg-white/15 rounded-lg flex mt-2 gap-2 justify-between items-center ${active ? 'bg-white/15' : ''}`}>
        <img src='https://www.github.com/sarthaksanjay.png' 
        className='h-14 w-14 rounded-lg ml-1' />
        <div className='h-16 w-[70%] text-black hover:text-white flex flex-col justify-center'>
            <span className='font-semibold'>{convertToUppercase(user.username)}</span>
            <span className='font-extralight'>message</span>
        </div>
    </div>
   </Link>
  )
}

export default UserChat