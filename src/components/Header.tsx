import { FiSearch } from "react-icons/fi"
import { CiMenuKebab } from "react-icons/ci";
import { User } from "./SearchModal";
import { useState } from "react";
import { convertToUppercase } from "../utils/util";
import { RxCross2 } from "react-icons/rx";

interface HeaderProp {
  user : User
}
const Header : React.FC<HeaderProp> = ({user}) => {
  const [searching , setSearching] = useState(false)
  return (
    <div className="h-14 w-full px-6 flex items-center justify-between border-b mx-2">
        <span className="font-semibold text-black text-2xl">{convertToUppercase(user.username)}</span>
       <div className="flex items-center">
       {!searching ? ''
          :  
          <input className="h-10 bg-transparent flex items-center px-3 outline-none border border-black text-small w-[300px] rounded-xl placeholder:text-sm  " placeholder="search message" />
        }
       <button
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-black/35 hover:text-white transition-all duration-500"
         onClick={()=>{
          setSearching((prev) => !prev)
         }}
        >
         {searching ? <RxCross2 /> : <FiSearch />}
        </button>
        <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full  hover:bg-black/35 hover:text-white transition-all duration-500"
        >
          <CiMenuKebab />
        </div>
       </div>
    </div>
  )
}

export default Header