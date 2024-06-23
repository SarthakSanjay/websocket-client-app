import { format } from "date-fns";
import AudioPlayer from "./AudioPlayer";

interface MessageProp {
  self?: boolean;
  data ?: string;
  time?: Date;
  type: string
}

const Message: React.FC<MessageProp> = ({ self, data ,time , type}) => {
// console.log(self,type,data,time);
    const renderMessageContent = () => {
      switch (type) {
        case 'TEXT':
          return <p className="w-max max-w-[200px]">{data}</p>;
        case 'VIDEO':
          return <video className="h-full w-full max-w-[200px] max-h-[200px] " controls src={data}></video>;
        case 'IMAGE':
          return <img className="h-[200px] w-[200px]" src={data} alt="Sent image" />;
        case 'AUDIO':
          //@ts-ignore
          return <AudioPlayer src={data} />;
        default:
          return null;
      }
    };

  return (
    <div
      className={` h-min w-max  py-2 px-3 rounded-lg m-3 relative text-purple-950
    ${self ? `${type === 'AUDIO' ? 'bg-none' : 'bg-black/35'}  text-white self-end` : ` ${type === 'AUDIO' ? 'bg-none' : 'bg-white/35'} self-start`} 

    `}
    >
      {renderMessageContent()}
      <span className={`text-[10px] w-max absolute top-[100%] ${self ? "left-0" : 'right-0'}`}>{time && format(time,"p")}</span>
    </div>
  );
};

export default Message;
