import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { audiosAtom } from "../atom/atom";
import { filesProp } from "../types/common";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TOKEN } from "../utils/util";
import AudioPlayer from "./AudioPlayer";

const Images = () => {
  const [audios , setAudios] = useRecoilState(audiosAtom);
  const { id } = useParams();
  useEffect(() => {
    async function fetchUserDetails() {
      const res = await axios.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setAudios(res.data.mediaAudio);
    }
    if (id) {
      fetchUserDetails();
    }
  }, [id]);
  return (
    <div
      className="h-[80vh] w-full overflow-y-scroll
     p-2"
    >
      <div className="flex flex-wrap gap-4 h-max">
        {audios.map((audio: filesProp) => {
          return (
            <AudioPlayer key={audio.id} src={audio.data} />
          );
        })}
      </div>
    </div>
  );
};

export default Images;
