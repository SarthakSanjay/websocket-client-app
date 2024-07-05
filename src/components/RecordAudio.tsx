import { useEffect, useState } from "react";
import { PiMicrophone, PiMicrophoneSlash } from "react-icons/pi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  fileAtom,
  messageTypeAtom,
  toggleRecordAtom,
  websocketAtom,
} from "../atom/atom";
import { useReactMediaRecorder } from "react-media-recorder";
import AudioPlayer from "./AudioPlayer";
import { BiPause, BiPlay } from "react-icons/bi";
import { MdRestartAlt } from "react-icons/md";
import { useStopwatch } from "react-timer-hook";
import SendBtn from "./SendBtn";
import { MessageProp } from "./MessageTypingBar";

interface recordAudio {
  onSendMessage: (message: MessageProp) => void;
}
const RecordAudio: React.FC<recordAudio> = ({ onSendMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const setToggleRecord = useSetRecoilState(toggleRecordAtom);
  const wss = useRecoilValue(websocketAtom);
  const setFile = useSetRecoilState(fileAtom);
  const setMessageType = useSetRecoilState(messageTypeAtom);
  const {
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
    clearBlobUrl,
    resumeRecording,
  } = useReactMediaRecorder({ video: false, audio: true });

  const { start, pause, reset, seconds, minutes } = useStopwatch({
    autoStart: false,
  });
  
  useEffect(() => {
    const fetchBlobAndSetFile = async () => {
      if (mediaBlobUrl) {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const audioFile = new File([blob], "recording.wav", {
          type: "audio/wav",
        });
        setFile(audioFile);
        setMessageType(audioFile.type.split("/")[0].toUpperCase());
      }
    };

    fetchBlobAndSetFile();
  }, [mediaBlobUrl]);

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
    if (isPaused) {
      start();
      resumeRecording();
      setIsPaused(false);
    } else {
      pauseRecording();
      pause();
      setIsPaused(true);
    }
  };
  // console.log('recordAudio');
  return (
    <div
      className="h-[400px] w-[500px] bg-black/85 rounded-lg
    absolute bottom-32 z-50 text-white flex justify-center items-center
    flex-col gap-4 "
    >
      {mediaBlobUrl ? (
        <AudioPlayer src={mediaBlobUrl} />
      ) : (
        <div className="h-16 p-2 text-[35px]">
          {minutes < 10 && "0"}
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </div>
      )}
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
          {isPaused ? <BiPlay /> : <BiPause />}
        </button>

        <button
          onClick={restartRecord}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-yellow-300 to-lime-500 text-black
        flex justify-center items-center text-3xl hover:bg-sky-500 hover:text-white"
        >
          <MdRestartAlt />
        </button>
        <SendBtn ws={wss} onSendMessage={onSendMessage} />
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
