import React, { useEffect } from 'react'
import { TbSend } from 'react-icons/tb'

interface SBprop {
    handleSendMessage : () => void
}

const SendBtn :React.FC<SBprop> = ({handleSendMessage}) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <button
            onClick={handleSendMessage}
            className="h-14 w-14 text-2xl flex items-center
          justify-center text-black rounded-full hover:bg-black/35 hover:text-white transition-all duration-500"
          >
            <TbSend />
          </button>
  )
}

export default SendBtn