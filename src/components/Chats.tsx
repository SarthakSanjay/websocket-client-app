import Header from "./Header"
import Message from "./Message"
import MessageTypingBar from "./MessageTypingBar"

const Chats = () => {
  return (
    <div className="h-full w-[70%] relative">
        <Header />
        <div className="h-[80%] px-3 overflow-y-scroll flex flex-col">
        <Message text="hello" />
        <Message text="hi" self={true}/>
        <Message text="what is going on"/>
        <Message text="just regular stuff" self={true}/>
        <Message text="I am planning for a vacation , wanna join"/>
        <Message text="yeah , why not" self={true}/>

        </div>
        <div className="absolute bottom-4 w-full flex justify-center">
            <MessageTypingBar />
        </div>
    </div>
  )
}

export default Chats