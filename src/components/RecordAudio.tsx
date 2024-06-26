import React, { useState } from "react";
import { PiMicrophone, PiMicrophoneSlash } from "react-icons/pi";
import { useSetRecoilState } from "recoil";
import { toggleRecordAtom } from "../atom/atom";

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const setToggleRecord = useSetRecoilState(toggleRecordAtom)
  const handleClick = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <div
      className="h-[400px] w-[500px] bg-black/85 rounded-lg
    absolute bottom-32 z-50 text-white flex justify-center items-center
    flex-col gap-4 "
    >
        {isRecording ? 'Stop when done' : 'Start speaking'}
      {isRecording ? (
        <button 
        onClick={handleClick}
        className="h-14 w-14 rounded-full bg-white text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white">
          <PiMicrophoneSlash />
        </button>
      ) : (
        <button 
        onClick={handleClick}
        className="h-14 w-14 rounded-full bg-white text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white">
          <PiMicrophone />
        </button>
      )}
      <button 
      onClick={()=>setToggleRecord(prev => !prev)}
      className="h-10 w-max py-1 px-5 bg-red-600 text-white rounded-lg
      hover:bg-red-800 absolute bottom-8">Close</button>
    </div>
  );
};

export default RecordAudio;
