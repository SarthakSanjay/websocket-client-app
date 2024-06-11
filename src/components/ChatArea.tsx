import { Outlet, useParams } from "react-router-dom"
import ChatAreaSidebar from "./ChatAreaSidebar"

const ChatArea = () => {
  const {id} = useParams()
  return (
    <div className={`h-full w-[65%] flex rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}>
        <ChatAreaSidebar />
        {id ?  <Outlet /> : <div className="self-center mx-auto">Open Chats</div>}
       
    </div>
  )
}

export default ChatArea