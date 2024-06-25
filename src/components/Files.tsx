import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mediaTypeAtom, toggleFilesAtom } from "../atom/atom";
import Images from "./Images";
import { TbArrowBack } from "react-icons/tb";
import Videos from "./Videos";
import Audios from "./Audios";

const Files = () => {
  const [mediaType, setMediaType] = useRecoilState(mediaTypeAtom);
  const setToggleFiles = useSetRecoilState(toggleFilesAtom);
  function renderContent() {
    switch (mediaType) {
      case "images":
        return <Images />;
      case "videos":
        return <Videos />;
      case "audios":
        return <Audios />;
      default:
        return <Images />;
    }
  }
  return (
    <div className=" h-full w-full">
      <div className="h-14 w-full my-1 flex items-center justify-between px-2">
        <button
          className="text-lg h-10 w-max rounded-lg 
            flex justify-center items-center px-3 gap-2 border
             hover:bg-black/35 "
          onClick={() => setToggleFiles(false)}
        >
          <TbArrowBack />
          Back
        </button>
      </div>
      <div className="h-10 w-full flex items-center justify-evenly border-b">
        <button onClick={() => setMediaType("images")}>Images</button>
        <button onClick={() => setMediaType("videos")}>Videos</button>
        <button onClick={() => setMediaType("audios")}>Audios</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Files;
