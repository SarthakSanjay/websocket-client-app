import { BiBell } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { fetchNotificationCount, totalFriendReqAtom } from "../atom/atom";
import { useEffect } from "react";
import { CiChat1 } from "react-icons/ci";
import Cookies from "js-cookie";

interface SidebarIconProp {
    url ?: string
    icon : React.ReactNode
    text : string
    value ?: number
}
const Sidebar = () => {
  const [notificationCount, setNotificationCount] =
    useRecoilState(totalFriendReqAtom);
  const notificationLoadable = useRecoilValueLoadable(fetchNotificationCount);

  useEffect(() => {
    if (notificationLoadable.state === "hasValue") {
      setNotificationCount(notificationLoadable.contents);
    }
  }, [
    notificationLoadable.state,
    notificationLoadable.contents,
    setNotificationCount,
  ]);

  return (
    <div className="flex flex-col items-center w-28 h-full bg-black">
        <SidebarIcon icon={<CiChat1 />} text="Chats" url="home"/>
        <SidebarIcon icon={<GoPerson />} text="Account" url="account"/>
        <SidebarIcon icon={<BiBell />} text="Notification" url="notification" value={notificationCount}/>
        <SidebarIcon icon={<IoSettingsOutline />} text="Setting" url="setting"/>
        {/* work in progress */}
        <button onClick={()=>{
          Cookies.remove('token')
        }}>

        <SidebarIcon icon={<TbLogout2 />} text="Logout" />
        </button>
    </div>
  );
};

const SidebarIcon : React.FC<SidebarIconProp>= ({icon,text,url,value}) =>{
  const location = useLocation()
  let isActive = location.pathname.includes(url || '')

  if(!url){
    isActive = false
  }

    return  <Link to={`/${url === '' ? '' : url}`}>
    <div
      className={`h-24 w-24 text-2xl mb-1 rounded-lg flex justify-center items-center flex-col
    hover:bg-gray-800 relative ${isActive ? 'bg-gray-800' :''}`}
    >
      {icon}
      <span className="text-sm">{text}</span>
      {
        url === 'notification' && value !== 0 ?
        <span className="absolute h-5 w-5 bg-orange-500 rounded-full top-4 right-7 flex items-center justify-center text-sm text-white">{value}</span>
        : ''
      }
      
    </div>
  </Link>
}
export default Sidebar;
