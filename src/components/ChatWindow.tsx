import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const ChatWindow = () => {
    const {connectionId} = useParams()
    const [searchParams ,setSearchParams] = useSearchParams()
    const [socket, setSocket] = useState<null | WebSocket>(null)
    const [messages , setMessages] = useState('')
    // const [text ,setText] = useState<string>('')
    const [allMessage , setAllMessage] = useState([])
    // console.log(username);
    // const handleChange = (e:any) =>{
    //   setText(e.target.value)
    // }
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
        console.log('message',message);
        setMessages(message.data)
        //@ts-ignore
        setAllMessage(m => [...m , message.data])
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
    <div className='w-3/4 h-[85vh] border m-4'>

        {allMessage.map((msg,i)=>{
          return <div key={i}>{msg}</div>
        })}
    </div>
  )
}

export default ChatWindow