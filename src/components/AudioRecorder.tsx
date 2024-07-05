import { BiMicrophone } from "react-icons/bi";
import { useSetRecoilState } from "recoil";
import { toggleRecordAtom } from "../atom/atom";

const AudioRecorder = () => {
  const setToggleRecord = useSetRecoilState(toggleRecordAtom);

  const handleClick = () => {
    setToggleRecord((prev) => !prev);
  };
  
  return (
    <button
      onClick={handleClick}
      className="h-14 w-14 text-2xl flex items-center
    justify-center text-black rounded-full 
  hover:bg-black/35 hover:text-white transition-all duration-500"
    >
      <BiMicrophone />
    </button>
  );
};

export default AudioRecorder;
