import {  useRef, useState } from "react";
import { PiMicrophone, PiMicrophoneSlash } from "react-icons/pi";
import { useSetRecoilState } from "recoil";
import { toggleRecordAtom } from "../atom/atom";
import { useReactMediaRecorder } from "react-media-recorder";
import AudioPlayer from "./AudioPlayer";
import { BiPause, BiPlay } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import { useStopwatch } from "react-timer-hook";


const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused ,setIsPaused] = useState(false)
  const setToggleRecord = useSetRecoilState(toggleRecordAtom);
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
    clearBlobUrl,
    resumeRecording,
  } = useReactMediaRecorder({ video: false, audio: true });
  const { start, pause, reset, seconds, minutes, isRunning } = useStopwatch({
    autoStart: false,
  });
  
  const startRecord = () => {
    setIsRecording(true);
    startRecording();
    start();
  };

  const stopRecord = () => {
    setIsRecording(false);
    stopRecording();
    reset(undefined, false);
  };

  const restartRecord = () => {
    clearBlobUrl();
    reset(undefined, false);
  };

  const pauseRecord = () => {
    if(isPaused){
      start()
      resumeRecording()
      setIsPaused(false)
    }else{
      pauseRecording();
      pause();
      setIsPaused(true)
    }
  };

  return (
    <div
      className="h-[400px] w-[500px] bg-black/85 rounded-lg
    absolute bottom-32 z-50 text-white flex justify-center items-center
    flex-col gap-4 "
    >
      {mediaBlobUrl ? <AudioPlayer src={mediaBlobUrl} /> : <div className="h-16 p-2 text-[35px]">
        {minutes < 10 && "0"}
        {minutes}:{seconds < 10 && "0"}
        {seconds}
      </div>}
      <div className="flex gap-3">
        {isRecording ? (
          <button
            onClick={stopRecord}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
          >
            <PiMicrophoneSlash />
          </button>
        ) : (
          <button
            onClick={startRecord}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
          >
            <PiMicrophone />
          </button>
        )}

        <button
          onClick={pauseRecord}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-red-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
        >
          {isPaused ? <BiPlay /> :<BiPause />}
        </button>

        <button
          onClick={restartRecord}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-yellow-300 to-lime-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
        >
          <MdRestartAlt />
        </button>
      </div>
      
      <button
        onClick={() => setToggleRecord((prev) => !prev)}
        className="h-10 w-max py-1 px-5 bg-red-600 text-white rounded-lg
      hover:bg-red-800 absolute bottom-8"
      >
        Close
      </button>
    </div>
  );
};

export default RecordAudio;
