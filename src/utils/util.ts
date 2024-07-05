import axios from "axios"
import Cookies from "js-cookie"
import { MessageProp } from "../components/MessageTypingBar"

export const TOKEN = Cookies.get('token')

export function setToken(token:string){
  Cookies.remove('token')
    Cookies.set('token',token)
}

export function convertToUppercase(text:string){
  return text.charAt(0).toUpperCase()+ text.slice(1)
}

export async function uploadFile(file:any , filename: string ) {
  const fileExtension = file.type.split("/")[1]
  const fileName = `${filename}.${fileExtension}`;

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

export const handleSendMessage = async (
  id: string | undefined ,
  ws: WebSocket | null ,
  input :string,
  messageType: string ,
  onSendMessage: (message:MessageProp)=> void ,
  setInput: (input:string)=>void ,
  file:any,
  filename: string ,
  setFile: any ,
  setFileUrl:(url:string) => void
  ) => {

    // console.log('id',id);
    // console.log('ws',ws);
    // console.log('input',input);
    // console.log('messageType',messageType);
    // console.log('file',file);
    // console.log('filename',filename);
  try {
    if (!id) return;

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
            contentType: file.type,
            filename: filename,
            createdAt: new Date(),
          };
          await uploadFile(file , filename);
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