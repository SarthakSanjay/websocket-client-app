import axios from "axios"
import { User } from "./SearchModal"
import { convertToUppercase, TOKEN } from "../utils/util"
import { useState } from "react"

interface SearchUserProp {
    user : User
}
const SearchedUser : React.FC<SearchUserProp> = ({user}) => {
  const [isSended, setIsSended] = useState(false)
  return (
    <div className="h-16 hover:bg-white/25 rounded-lg my-1 cursor-pointer pr-2 flex justify-between items-center">
    <div className="flex gap-3 items-center">
    <img 
       src="https://www.github.com/sarthaksanjay.png"
       className="h-16 w-16 rounded-lg" />
       <div className="flex flex-col">
            <h1>{convertToUppercase(user.username)}</h1>
            <h1>{user.email}</h1>
       </div>
    </div>

       <div className="flex h-full gap-3 opacity-0 hover:opacity-100 items-center">
        <button className="w-max h-8 px-2 py-1 rounded-lg bg-gradient-to-r from-slate-300 to-slate-500 text-black text-sm">Details</button>
        <button onClick={async()=>{
         const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/friend/request`,{
            friendId:user.id
          },{
            headers:{
              Authorization :  `Bearer ${TOKEN}`
            }
          })
          if(res.status === 200){
            setIsSended(true)
          }
        }}
         className={`w-max h-8 px-2 py-1 rounded-lg ${isSended ? 'bg-black text-green-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'} text-sm`}>{isSended ? 'Sent': 'Send Request'}</button>
       </div>
    </div>
  )
}

export default SearchedUser