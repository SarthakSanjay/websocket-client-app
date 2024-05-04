import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import MessageInputBar from './components/MessageInputBar'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages , setMessages] = useState('')
  const [text ,setText] = useState<string>('')
  const [allMessage , setAllMessage] = useState([])
  const {username} = useParams()
  console.log(username);
  const handleChange = (e:any) =>{
    setText(e.target.value)
  }
  useEffect(()=>{
    console.log(username);
    const socket = new WebSocket(`ws://localhost:8080`)
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
  if(!socket){
    return <div>connecting to ws server...</div>
  }
  return (
    <div className='h-screen w-screen bg-black text-white flex justify-center'>
      <Outlet />
      <div className='w-full absolute bottom-10 flex justify-center'>
        <MessageInputBar />
      </div>
    </div>
  )
}

export default App
