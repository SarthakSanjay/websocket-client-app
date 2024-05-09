import React from 'react'
import { Outlet } from 'react-router-dom'
import MessageInputBar from './MessageInputBar'

const MessageArea = () => {
  return (
    <div className='h-full w-3/4 flex flex-col '>
        <Outlet />
      <div className='w-full h-[15vh] flex justify-center items-center '>
        <MessageInputBar />
      </div>
    </div>
  )
}

export default MessageArea