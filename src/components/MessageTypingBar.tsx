import { useParams } from "react-router-dom";
import React, { useRef, useState } from "react";
import SendBtn from "./SendBtn";
import AudioRecorder from "./AudioRecorder";
import Media from "./Media";
import { fileUrlAtom } from "../atom/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { TOKEN } from "../utils/util";

export interface MessageProp {
  friendId: number;
  data?: string;
  messageType: string;
  filename?: string;
  contentType?: string;
  createdAt?: Date;
}

interface MessageTypingBarProp {
  ws: WebSocket | null;
  onSendMessage: (message: MessageProp) => void;
}

const MessageTypingBar: React.FC<MessageTypingBarProp> = ({
  ws,
  onSendMessage,
}) => {
  const { id } = useParams<{ id: string }>();
  const [input, setInput] = useState("");
  const [messageType, setMessageType] = useState("TEXT");
  const [fileUrl, setFileUrl] = useRecoilState(fileUrlAtom);
  const [fileData, setFileData] = useState<{ name: string; type: string }>({
    name: "",
    type: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [filename, setFilename] = useState(`${Date.now()}`);

  async function uploadFile(file: any) {
    const fileExtension = file.type.split("/")[1];
    const fileType = file.type.split("/")[0];
    const fileName = `${fileType}-${filename}.${fileExtension}`;

    try {
      let res = await axios.post(
        `/upload/file`,
        {
          filename: fileName,
          contentType: file.type,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.status, res.data.url);
        console.log("formdata", file);
        let upload = await axios.put(res.data.url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        if (upload.status === 200) {
          alert(`image uploaded ${upload.status} ${upload}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDivClick = () => {
    if (fileInputRef.current) {
      //@ts-ignore
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log("file", file.type.split("/")[1]);
    setFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileData({ name: file.name, type: file.type });
      setMessageType(file.type.split("/")[0].toUpperCase());
    }
  };
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       handleSendMessage();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      if (!id) return;
      // if (input.trim() === "" || !id ) return;

      if (ws && ws.readyState === WebSocket.OPEN) {
        
        if (input.trim() !== "") {
          let message: MessageProp = {
            friendId: parseInt(id, 10),
            data: input,
            messageType: messageType,
            createdAt: new Date(),
          };
          console.log("message", message);
          ws.send(JSON.stringify(message));
          onSendMessage(message);
          setInput("");
        }
        if (file) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64data = reader.result as string;
            const message: MessageProp = {
              friendId: parseInt(id, 10),
              data: base64data,
              messageType: messageType,
              contentType: fileData.type,
              filename: filename,
              createdAt: new Date(),
            };
            await uploadFile(file);
            ws.send(JSON.stringify(message));
            onSendMessage(message);
            setFile(null);
            setFileUrl("");
          };
          reader.readAsDataURL(file);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
        <SendBtn handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessageTypingBar;
