import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const MessageInputBar = () => {
  const [text , setText] = useState('')
  const [searchParams , setSearchParams] = useSearchParams()
  const [connection, setConnection] = useState<null | WebSocket>(null);
  const {connectionId} = useParams()
  const handleChange = (e:any) =>{
    setText(e.target.value)
  }
  useEffect(()=>{
    const username = searchParams.get('username')
      const socket = new WebSocket(`ws://localhost:8080/${connectionId}?username=${username}`)
      socket.onopen = () =>{
        setConnection(socket)
      }

      return () =>{
        socket.close()
      }
  },[])
  const handleClick = () =>{
    if (connection && text) {
      connection.send(text);
      setText(''); 
    }
  }
  return (
    <div className='h-15 w-1/2 flex justify-center items-center'>
        <input className='h-full w-[600px] px-5' 
        onChange={handleChange}/>
        <button className='h-full w-[200px]'
        onClick={handleClick}>Send</button>
    </div>
  )
}

export default MessageInputBar