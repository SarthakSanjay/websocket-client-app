import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [messages , setMessages] = useState('')
  const [text ,setText] = useState<string>('')
  const [allMessage , setAllMessage] = useState([])

  const handleChange = (e:any) =>{
    setText(e.target.value)
  }
  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () =>{
      console.log('connected');
      setSocket(socket)
    }
    socket.onmessage = (message) =>{
      console.log('received message' , message.data);
      console.log(message);
      setMessages(message.data)
      setAllMessage(m => [...m , message.data])
    }
    setSocket(socket)
  },[])
  if(!socket){
    return <div>connecting to ws server...</div>
  }
  return (
    <div style={{height:'100vh',width:'100vw'}}>
      <input onChange={handleChange}/>
      <button onClick={()=>{
        socket.send(text)
      }}>send</button>
      {messages}
      {allMessage.map((msg) =>{
        return <p>{msg}</p>
      })}
    </div>
  )
}

export default App
