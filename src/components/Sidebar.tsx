import { GoPerson } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-28 h-full bg-black">
        <div className="h-24 w-24 text-2xl rounded-lg flex justify-center items-center flex-col
        hover:bg-gray-800">
            <GoPerson />
            <text className="text-lg">Account</text>
        </div>
        <div className="h-24 w-24 text-2xl rounded-lg flex justify-center items-center flex-col
        hover:bg-gray-800">
            <IoSettingsOutline />
            <text className="text-lg">Setting</text>
        </div>
        <div className="h-24 w-24 text-2xl rounded-lg flex justify-center items-center flex-col
        hover:bg-gray-800 ">
            <TbLogout2 />
            <text className="text-lg">Logout</text>
        </div>
    </div>
  )
}

export default Sidebar