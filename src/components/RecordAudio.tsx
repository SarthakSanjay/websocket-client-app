import React, { useEffect, useState } from "react";
import { PiMicrophone, PiMicrophoneSlash } from "react-icons/pi";
import { useSetRecoilState } from "recoil";
import { toggleRecordAtom } from "../atom/atom";
import { useReactMediaRecorder } from "react-media-recorder";
import AudioPlayer from "./AudioPlayer";
import { BiPause } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import { useStopwatch } from "react-timer-hook";

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  // const [second , setSecond] = useState('00')
  // const [minute , setMinute] = useState('00')
  const setToggleRecord = useSetRecoilState(toggleRecordAtom);
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({ video: false, audio: true });
  const {start , pause , reset  , seconds , minutes , isRunning} = useStopwatch({autoStart: false})
  console.log(isRecording);
  console.log(mediaBlobUrl);

  const startRecord = () => {
    setIsRecording(true);
    startRecording();
    start()
  };

  const stopRecord = () => {
    setIsRecording(false);
    stopRecording();
    pause()
  };

  const restartRecord = () => {
    clearBlobUrl();
    reset()
    pause()
  };

  const pauseRecord = () =>{
    pauseRecording()
    pause()
  }
  return (
    <div
      className="h-[400px] w-[500px] bg-black/85 rounded-lg
    absolute bottom-32 z-50 text-white flex justify-center items-center
    flex-col gap-4 "
    >
      <div className="border">{status}</div>
      {isRunning && <div className="border">{minutes}:{seconds}</div>}
      {mediaBlobUrl ? <AudioPlayer src={mediaBlobUrl} /> : ""}
      {isRecording ? "Stop when done" : "Start speaking"}

      <div className="flex gap-3">
        {isRecording ? (
          <button
            onClick={stopRecord}
            className="h-14 w-14 rounded-full bg-orange-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
          >
            <PiMicrophoneSlash />
          </button>
        ) : (
          <button
            onClick={startRecord}
            className="h-14 w-14 rounded-full bg-green-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
          >
            <PiMicrophone />
          </button>
        )}

        <button
          onClick={pauseRecord}
          className="h-14 w-14 rounded-full bg-white text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
        >
          <BiPause />
        </button>

        <button
          onClick={restartRecord}
          className="h-14 w-14 rounded-full bg-yellow-400 text-black
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
