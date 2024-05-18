import { FiSearch } from "react-icons/fi"
import { CiMenuKebab } from "react-icons/ci";

const Header = () => {
  return (
    <div className="h-14 w-full px-6 flex items-center justify-between">
        <text className="font-semibold text-black text-2xl">Username</text>
       <div className="flex">
       <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-purple-300"
        >
          <FiSearch />
        </div>
        <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-purple-300"
        >
          <CiMenuKebab />
        </div>
       </div>
    </div>
  )
}

export default Header