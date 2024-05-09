import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const ChatWindow = () => {
    const {connectionId} = useParams()
    const [searchParams ,setSearchParams] = useSearchParams()
    const [socket, setSocket] = useState<null | WebSocket>(null)
    const [messages , setMessages] = useState('')
    const [user , setUser] = useState('')
    const username = searchParams.get('username')
    const [allMessage , setAllMessage] = useState([])

    console.log('username',searchParams.get('username'));
    useEffect(()=>{
      const username = searchParams.get('username')
      const socket = new WebSocket(`ws://localhost:8080/${connectionId}?username=${username}`)
      socket.onopen = () =>{
        console.log('connected');
        setSocket(socket)
      }
      socket.onmessage = (message) =>{
        // console.log('received message' , message.data);
        let {text , sender} = JSON.parse(message.data)
        console.log('message',text ,sender);
        //@ts-ignore
        setMessages(m => [...m , text])
        setUser(sender)
        //@ts-ignore
        setAllMessage(m => [...m , {
          text:text,
          sender:sender
        }])
      }
      setSocket(socket)
  
      return () =>{
        socket.close()
      }
    },[])
    console.log(allMessage);
    if(!socket){
      return <div>connecting to ws server...</div>
    }
  return (
    <div className='w-full h-[85vh] '>

        {allMessage.map((msg:{sender:string,text:string},i)=>{
          return <div key={i} className={`w-full h-15 flex
            ${msg.sender === username ? 'justify-end' :'justify-start'}
          `}>
            <span className={`w-max px-3 py-1 rounded-lg m-2  ${msg.sender === username ? 'bg-sky-500' : 'bg-sky-800' }`}>
              {msg.text}

            </span>
          </div>
        })}
    </div>
  )
}

export default ChatWindow