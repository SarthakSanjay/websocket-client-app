import { useParams } from "react-router-dom";
import Header from "./Header";
import Message from "./Message";
import MessageTypingBar from "./MessageTypingBar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TOKEN } from "../utils/util";
import { User } from "./SearchModal";
import { useRecoilValueLoadable } from "recoil";
import { fetchSelfDetails } from "../atom/atom";
import { RxCross2 } from "react-icons/rx";

interface Message {
  friendId: number;
  text: string;
  createdAt?: Date;
}

interface SavedMessage extends Message {
  id:number,
  senderId:number,
  receiverId:number,
}

const Chats = () => {
  const {id} = useParams()
  const [user , setUser] = useState<User>({id:0,username:'',email:''})
  const [message , setMessages] = useState<Message[]>([])
  const [savedMessages , setSavedMessages] = useState([])
  const [selectedMessages , setSelectedMessages] = useState<number[]>([])
  const ws = useRef<WebSocket | null>(null);
  const userLoadable = useRecoilValueLoadable(fetchSelfDetails);
  const [myId, setMyId] = useState<number>(0);
  const [deleted , setDeleted] = useState(false)
  useEffect(() => {
    if (userLoadable.state === 'hasValue') {
      setMyId(userLoadable.contents.id);
    }
  }, [userLoadable]);

  useEffect(()=>{
    async function fetchUserDetails() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`,{
        headers:{
          Authorization: `Bearer ${TOKEN}`
        }
      })
     if(id){
      setUser(res.data.user)
     }
    }
    fetchUserDetails()

     async function fetchChatMessages() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/chat/${id}`,{
          headers:{
            Authorization: `Bearer ${TOKEN}`
          }
      })
      setSavedMessages(res.data.messages)
     }

     fetchChatMessages()
     console.log('id changed');
  },[id,deleted])

  useEffect(() => {
    if (myId) {
      ws.current = new WebSocket(`ws://localhost:8080/${myId}`);

      ws.current.onopen = () => {
        console.log('Connected to WebSocket server');
      };
      
      ws.current.onmessage = (e) => {
        const receivedMessage  = JSON.parse(e.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setMessages([])
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [user.id]);


  const handleSendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  
  const toggleSelectMessage = (messageId : number) =>{
    setSelectedMessages(prev => 
      prev.includes(messageId) ?
      prev.filter(id => id !== messageId) :
      [...prev , messageId]
      )
  }

  const handleDeleteMessage = async() =>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/message/delete`,{
        data:{
          messageIds : selectedMessages
        },
        headers:{
          Authorization : `Bearer ${TOKEN}`
        }
      })
      if(res.status === 200){
        alert('deleted')
        setDeleted(true)
      }
      setSelectedMessages([]);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  }

  return (
    <div className="h-full w-[70%] relative text-black">
      <Header user={user} />
      <div className="h-[80%] px-3 overflow-y-scroll flex flex-col" >
        {
          savedMessages.map((msg:SavedMessage)=>{
            const isSelected = selectedMessages.includes(msg.id)
            return <div className={`w-full flex flex-col items-center h-max rounded-lg mb-1 pb-1 ${isSelected ? 'bg-green-500/65': ''}`}
            onClick={()=> toggleSelectMessage(msg.id)}
            >
              <Message key={msg.id} time={msg.createdAt} text={msg.text} self={msg.senderId === myId ? true : false} />
            </div>
           })}
       {message.map((msg,index)=>{
        return <Message key={index} time={msg.createdAt} text={msg.text} self={msg.friendId !== myId ? true : false} />
       })}
      </div>
      <div className="absolute bottom-4 w-full flex justify-center">
        <MessageTypingBar ws={ws.current} onSendMessage={handleSendMessage} />
      </div>
      {
        selectedMessages.length > 0 &&
        <div className="h-16 w-[400px] bg-black absolute rounded-lg flex items-center justify-between px-3">
         <h1 className="text-white"> {selectedMessages.length} messages selected</h1>
         <div className="flex gap-2">
         <button className="h-10 w-max px-3 bg-red-600 hover:bg-red-700 rounded-lg"
         onClick={handleDeleteMessage}
         >Delete</button>
         <button className="h-10 w-max px-3 bg-white hover:bg-black border hover:text-white text-black  rounded-lg" 
         onClick={()=>{setSelectedMessages([])}}
         > <RxCross2 /> </button>
         </div>
        </div>
      }
    </div>
  );
};

export default Chats;
