import React, { useEffect, useRef } from "react";
import { TbSend } from "react-icons/tb";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fileAtom,
  filenameAtom,
  fileUrlAtom,
  inputAtom,
  messageTypeAtom,
} from "../atom/atom";
import { useParams } from "react-router-dom";
import { handleSendMessage } from "../utils/util";
import { MessageProp } from "./MessageTypingBar";

interface SBprop {
  ws: WebSocket | null;
  onSendMessage: (message: MessageProp) => void;
}

const SendBtn: React.FC<SBprop> = ({ ws, onSendMessage }) => {
  const { id } = useParams<{ id: string | undefined }>();
  const messageType = useRecoilValue(messageTypeAtom);
  const [_fileUrl, setFileUrl] = useRecoilState(fileUrlAtom);
  const [file, setFile] = useRecoilState(fileAtom);
  const filename = useRecoilValue(filenameAtom);
  const [input, setInput] = useRecoilState(inputAtom);
  const sendBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && sendBtnRef.current) {
        sendBtnRef.current.click();
        console.log("clicked");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <button
      ref={sendBtnRef}
      onClick={() => {
        handleSendMessage(
          id,
          ws,
          input,
          messageType,
          onSendMessage,
          setInput,
          file,
          filename,
          setFile,
          setFileUrl
        );
      }}
      className="h-14 w-14 text-2xl flex items-center
          justify-center text-black rounded-full hover:bg-black/35 hover:text-white transition-all duration-500"
    >
      <TbSend />
    </button>
  );
};

export default SendBtn;
