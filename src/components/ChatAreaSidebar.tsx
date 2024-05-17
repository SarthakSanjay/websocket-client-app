import Search from "./Search"
import Users from "./Users"

const ChatAreaSidebar = () => {
  return (
    <div className=" border-black h-full w-[30%]">
        <Search />
        <Users />
    </div>
  )
}

export default ChatAreaSidebar