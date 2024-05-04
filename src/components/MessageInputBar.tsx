import React from 'react'

const MessageInputBar = () => {
  return (
    <div className='h-15 w-1/2 flex justify-center items-center'>
        <input className='h-full w-[600px] px-5'/>
        <button className='h-full w-[200px]'>Send</button>
    </div>
  )
}

export default MessageInputBar