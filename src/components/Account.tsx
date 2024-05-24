import { useState } from "react"
import { MdEdit, MdOutlineEditOff } from "react-icons/md"

const Account = () => {
    const [username , setUsername] = useState('sharko')
    const [email , setEmail] = useState('sharko@gmail.com')
    const [editUsername , setEditUsername] = useState(false)
  return (
    <div className={`h-full w-[65%] flex flex-col rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}>
        <h1 className="text-3xl">Account</h1>
        <div className="flex flex-col my-4 h-full w-full p-4">
            <div className="flex gap-5 items-center">
                <label className="text-xl">Username</label>
                <div className="h-10 w-2/3 flex items-center justify-between px-3 bg-white/15 border border-black text-white rounded-lg">
                    <div className="w-full">{editUsername ? <input className="bg-transparent h-10 cursor-pointer w-full  outline-none placeholder:text-white" placeholder="New Username" /> : `${username}`}</div>
                    <button onClick={()=>{
                        setEditUsername(prev => !prev)
                    }} className="text-xl h-10 w-10 flex items-center justify-center cursor-pointer">{!editUsername ? <MdEdit /> : <MdOutlineEditOff />}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account