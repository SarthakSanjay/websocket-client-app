import { FiSearch } from "react-icons/fi"
import { CiMenuKebab } from "react-icons/ci";
import { User } from "./SearchModal";

interface HeaderProp {
  user : User
}
const Header : React.FC<HeaderProp> = ({user}) => {
  return (
    <div className="h-14 w-full px-6 flex items-center justify-between">
        <span className="font-semibold text-black text-2xl">{user.username.charAt(0).toUpperCase()+ user.username.slice(1)}</span>
       <div className="flex">
       <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-black/35 hover:text-white transition-all duration-500"
        >
          <FiSearch />
        </div>
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