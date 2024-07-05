import React, { useRef } from "react";
import SendBtn from "./SendBtn";
import AudioRecorder from "./AudioRecorder";
import Media from "./Media";
import { fileAtom, fileUrlAtom, inputAtom, messageTypeAtom } from "../atom/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

export interface MessageProp {
  friendId: number;
  data?: string;
  messageType: string;
  filename?: string;
  contentType?: string;
  createdAt?: Date;
}

interface MessageTypingBarProp {
  ws: WebSocket | null 
  onSendMessage: (message: MessageProp) => void;
}

const MessageTypingBar: React.FC<MessageTypingBarProp> = ({
  ws,
  onSendMessage,
}) => {
  const setMessageType = useSetRecoilState(messageTypeAtom)
  const setFileUrl = useSetRecoilState(fileUrlAtom);
  const setFile = useSetRecoilState(fileAtom)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [input , setInput] = useRecoilState(inputAtom)

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setMessageType(file.type.split("/")[0].toUpperCase());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="h-14 w-[90%] rounded-lg bg-white/15 flex relative">
      <Media
        handleDivClick={handleDivClick}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
      />
      <input
        className="bg-transparent
        text-black outline-none
        w-[70%] placeholder:text-gray-700 px-4"
        placeholder="Your Message"
        value={input}
        onChange={handleChange}
      />
      <div className="flex ">
        <AudioRecorder />
        <SendBtn ws={ws} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default MessageTypingBar;
