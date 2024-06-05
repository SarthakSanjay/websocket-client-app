interface MessageProp {
  self?: boolean;
  text: string;
}
const Message: React.FC<MessageProp> = ({ self, text }) => {
  // console.log(self);
  return (
    <div
      className={`h-min  max-w-[40%] py-2 px-3 rounded-lg m-3 relative text-purple-950
    ${self ? " bg-black/35 text-white self-end" : " bg-white/35 self-start"} 

    `}
    >
      {text}
    </div>
  );
};

export default Message;
