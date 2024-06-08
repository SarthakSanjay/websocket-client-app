import { format } from "date-fns";

interface MessageProp {
  self?: boolean;
  text: string;
  time?: Date;
}
const Message: React.FC<MessageProp> = ({ self, text ,time}) => {
  // console.log(self);
  return (
    <div
      className={`h-min  max-w-[40%] py-2 px-3 rounded-lg m-3 relative text-purple-950
    ${self ? " bg-black/35 text-white self-end" : " bg-white/35 self-start"} 

    `}
    >
      {text}
      <span className={`text-[10px] absolute top-[100%] ${self ? "left-0" : 'right-0'}`}>{time && format(time,"p")}</span>
    </div>
  );
};

export default Message;
