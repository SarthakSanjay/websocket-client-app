import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { imagesAtom } from "../atom/atom";
import { filesProp } from "../types/common";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TOKEN } from "../utils/util";

const Images = () => {
  const [images, setImages] = useRecoilState(imagesAtom);
  const { id } = useParams();
  useEffect(() => {
    async function fetchUserDetails() {
      const res = await axios.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setImages(res.data.mediaImages);
    }
    if (id) {
      fetchUserDetails();
    }
  }, [id]);
  return (
    <div
      className="h-[80vh] w-full border overflow-y-scroll
     p-2"
    >
      <div className="flex flex-wrap gap-4 h-max">
        {images.map((img: filesProp) => {
          return (
            <img key={img.id} src={img.data} className="h-20 w-20 rounded-lg" />
          );
        })}
      </div>
    </div>
  );
};

export default Images;
