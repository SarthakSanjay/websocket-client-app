import { useEffect, useState } from 'react'

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

    return () =>{
      socket.close()
    }
  },[])
  if(!socket){
    return <div>connecting to ws server...</div>
  }
  return (
    <div style={{height:'100vh',width:'100vw' }}>
     <div style={{position:'absolute' , bottom:'50px',height:'40px' , width:'100vw', display:'flex',justifyContent:"center" ,alignItems:'center'}}>
     <input onChange={handleChange}
      style={{height:'100%', width:'20vw', borderRadius:'20px',outline:'none' , border:"2px solid white",paddingLeft:"30px",
    borderTopRightRadius:"0px",borderBottomRightRadius:"0px"}}
     />
      <button onClick={()=>{
        socket.send(text)
      }}
      style={{
        height:'100%' ,
        background:"skyblue",
        color:'black',
        borderTopLeftRadius:'0px',
        borderBottomLeftRadius:'0px',
      }}>send</button>
     </div>
      {messages}
      {allMessage.map((msg) =>{
        return <p>{msg}</p>
      })}
    </div>
  )
}

export default App
