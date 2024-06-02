import { useParams } from "react-router-dom";
import Header from "./Header";
import Message from "./Message";
import MessageTypingBar from "./MessageTypingBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { TOKEN } from "../utils/util";
import { User } from "./SearchModal";

const Chats = () => {
  const {id} = useParams()
  const [user , setUser] = useState<User>({id:0,username:'',email:''})
  console.log('user',user);
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
  },[id])
  return (
    <div className="h-full w-[70%] relative text-black">
      <Header user={user} />
      <div className="h-[80%] px-3 overflow-y-scroll flex flex-col">
        <Message text="hello" />
        <Message text="hi" self={true} />
        <Message text="what is going on" />
        <Message text="just regular stuff" self={true} />
        <Message text="I am planning for a vacation , wanna join" />
        <Message text="yeah , why not" self={true} />
      </div>
      <div className="absolute bottom-4 w-full flex justify-center">
        <MessageTypingBar />
      </div>
    </div>
  );
};

export default Chats;
