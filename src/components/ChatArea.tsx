import ChatAreaSidebar from "./ChatAreaSidebar"
import Chats from "./Chats"

const ChatArea = () => {
  return (
    <div className={`h-full w-[65%] flex rounded-3xl bg-purple-100 p-4`}>
        <ChatAreaSidebar />
        <Chats />
    </div>
  )
}

export default ChatArea