import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchModal from "./SearchModal";
import axios from "axios";
import { TOKEN } from "../utils/util";

const Search = () => {
  const [input , setInput] = useState('')
  const [users ,setUsers] = useState([])
  useEffect(()=>{
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/search`,{
      params:{
        search: input
      },
      headers:{
        Authorization: `Bearer ${TOKEN}`
      }
    }).then(res => setUsers(res.data.users))
    console.log(users);
  },[input])
  return (
    <div className="h-10 w-full bg-white/15 border border-black flex text-white rounded-lg ">
        <div className="h-10 w-10 text-2xl flex justify-center items-center text-black"><FiSearch /></div>
        <input type="text" className="h-full w-full bg-transparent outline-none px-1
        placeholder:text-black"
        onChange={(e)=>{
          setInput(e.target.value)
        }}
        placeholder="search" />
        {input.trim() !== '' && 
        
        <SearchModal users={users} />
        }
    </div>
  )
}

export default Search