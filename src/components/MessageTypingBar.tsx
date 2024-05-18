import { GrAttachment } from "react-icons/gr";
import { BiMicrophone } from "react-icons/bi";
import { TbSend } from "react-icons/tb";

const MessageTypingBar = () => {
  return (
    <div className="h-14 w-[90%] rounded-lg bg-purple-200 flex">
      <div
        className="h-14 w-14 text-2xl flex items-center rounded-full hover:bg-purple-300
         justify-center text-black"
      >
        <GrAttachment />
      </div>
      <input
        className="bg-transparent
        text-black outline-none
        w-[70%] placeholder:text-gray-700 px-4"
        placeholder="Your Message"
      />
      <div className="flex ">
        <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-purple-300"
        >
          <BiMicrophone />
        </div>
        <div
          className="h-14 w-14 text-2xl flex items-center
         justify-center text-black rounded-full hover:bg-purple-300"
        >
          <TbSend />
        </div>
      </div>
    </div>
  );
};

export default MessageTypingBar;
