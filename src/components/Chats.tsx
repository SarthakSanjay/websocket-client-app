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

interface Message {
  friendId: number;
  text: string;
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
  const ws = useRef<WebSocket | null>(null);
  const userLoadable = useRecoilValueLoadable(fetchSelfDetails);
  const [myId, setMyId] = useState<number>(0);

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
  },[id])

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
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [user.id]);


  const handleSendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  
  return (
    <div className="h-full w-[70%] relative text-black">
      <Header user={user} />
      <div className="h-[80%] px-3 overflow-y-scroll flex flex-col" >
        {
          savedMessages.map((msg:SavedMessage)=>{
            return <Message key={msg.id} text={msg.text} self={msg.senderId === myId ? true : false} />
           })}
       {message.map((msg,index)=>{
        return <Message key={index} text={msg.text} self={msg.friendId !== myId ? true : false} />
       })}
      </div>
      <div className="absolute bottom-4 w-full flex justify-center">
        <MessageTypingBar ws={ws.current} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chats;
