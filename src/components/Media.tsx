import React from 'react'
import { GrAttachment } from 'react-icons/gr'

interface MediaProp {
    handleDivClick : () => void
    fileInputRef : React.RefObject<HTMLInputElement>
    handleFileChange : (event:any) => void
}
const Media : React.FC<MediaProp> = ({handleDivClick , handleFileChange , fileInputRef}) => {
  return (
    <div
    className="h-14 w-14 text-2xl flex items-center rounded-full
  justify-center text-black  hover:bg-black/35 hover:text-white transition-all duration-500"
    onClick={handleDivClick}
  >
    <GrAttachment />
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={handleFileChange}
      accept="image/*,audio/*,video/*" // This will limit the file selection to image files only
    />
  </div>
  )
}

export default Media