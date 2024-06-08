import { GrAttachment } from "react-icons/gr";
import { BiMicrophone } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Message {
  friendId: number;
  text: string;
  createdAt ?: Date
}

interface MessageTypingBarProp {
  ws: WebSocket | null;
  onSendMessage: (message: Message) => void;
}

const MessageTypingBar: React.FC<MessageTypingBarProp> = ({ ws, onSendMessage }) => {
  const { id } = useParams<{ id: string }>();
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '' || !id) return;

    if (ws && ws.readyState === WebSocket.OPEN && input.trim() !== '') {
      const message: Message = { friendId: parseInt(id, 10), text: input ,createdAt: new Date() };
      ws.send(JSON.stringify(message));
      onSendMessage(message);
      setInput('');
    }
  };

  return (
    <div className="h-14 w-[90%] rounded-lg bg-white/15 flex">
      <div
        className="h-14 w-14 text-2xl flex items-center rounded-full
         justify-center text-black  hover:bg-black/35 hover:text-white transition-all duration-500"
      >
        <GrAttachment />
      </div>
      <input
        className="bg-transparent
        text-black outline-none
        w-[70%] placeholder:text-gray-700 px-4"
        placeholder="Your Message"
        value={input}
        onChange={handleChange}
      />
      <div className="flex ">
        <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full  hover:bg-black/35 hover:text-white transition-all duration-500"
        >
          <BiMicrophone />
        </div>
        <button
          onClick={handleSendMessage}
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-black/35 hover:text-white transition-all duration-500"
        >
          <TbSend />
        </button>
      </div>
    </div>
  );
};

export default MessageTypingBar;
