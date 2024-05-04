import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ChatWindow = () => {
    const {username} = useParams()
    useEffect(()=>{},[])
  return (
    <div className='w-3/4 h-[85vh] border m-4'>
        {username}
    </div>
  )
}

export default ChatWindow