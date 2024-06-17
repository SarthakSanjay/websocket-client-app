import React from 'react'
import { BiMicrophone } from 'react-icons/bi'

const AudioRecorder = () => {
  return (
    <div
    className="h-14 w-14 text-2xl flex items-center
  justify-center text-black rounded-full  hover:bg-black/35 hover:text-white transition-all duration-500"
  >
    <BiMicrophone />
  </div>
  )
}

export default AudioRecorder