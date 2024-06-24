import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdEdit, MdOutlineEditOff } from "react-icons/md";
import { TOKEN } from "../utils/util";
import { useRecoilValueLoadable } from "recoil";
import { fetchSelfDetails } from "../atom/atom";

interface user {
  id: number;
  username: string;
  email: string;
  profileImageUrl?: string;
}
const Account = () => {
  const userLoadable = useRecoilValueLoadable(fetchSelfDetails);
  const [user, setUser] = useState<user | null>(null);
  const [image, setImage] = useState(null);
  const [uniqueImageName, setUniqueImageName] = useState(`${Date.now()}`);
  const [imageName , setImageName] = useState('')
  const [tempImageUrl ,setTempImageUrl] = useState('')
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (userLoadable.state === "hasValue") {
      setUser(userLoadable.contents);
    }
  }, [userLoadable]);

  async function uploadImage(image: any) {
    try {
      let res = await axios.post(
        `/upload/file`,
        {
          filename: imageName,
          contentType: image.type,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.status, res.data.url);

        let upload = await axios.put(res.data.url, image, {
          headers: {
            "Content-Type": image.type,
          },
        });

        if (upload.status === 200) {
          alert(`image uploaded ${upload.status} ${upload}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDivClick = () => {
    if (imageInputRef.current) {
      //@ts-ignore
      imageInputRef.current.click();
    }
  };

  const handleImageChange = async (event: any) => {
    const image = event.target.files[0];
    setImage(image);
    console.log(image);
    if (image) {
      const url = URL.createObjectURL(image);
      setTempImageUrl(url)
      const imageExtension = image.type.split("/")[1];
      const imgName = `${uniqueImageName}.${imageExtension}`;
      setImageName(imgName)
    }
  };

  const handleUpload = async() =>{
    if(!image) return
    const res = await axios.patch(
      `/user/details`,
      {
        fieldToUpdate: 'profileImageUrl',
        value: imageName,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    if(res.status === 200){
      await uploadImage(image)
      alert('image uploaded')
    }
  }
  return (
    <div
      className={`h-full w-[65%] flex flex-col items-start rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}
    >
      <h1 className="text-3xl">Account</h1>
      <div className="flex flex-col items-center gap-2 px-4 ">
        <div
          className="h-[300px] w-[300px] rounded-full cursor-pointer hover:bg-black/35 "
          onClick={handleDivClick}
        >
          <img
            className="h-[300px] w-[300px] border rounded-full"
            src={image ? tempImageUrl : user?.profileImageUrl}
          />
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button className="h-10 p-2 w-max rounded-lg bg-black hover:bg-white text-white hover:text-black"
        onClick={handleUpload}>Upload</button>
      </div>
      <div className="flex gap-2 flex-col my-4 h-full w-full p-4">
        <Fields field={user?.username} label={"Username"} />
        <Fields field={user?.email} label={"Email"} />
      </div>
    </div>
  );
};

interface FieldsProp {
  field?: string;
  label: string;
}

const Fields: React.FC<FieldsProp> = ({ field, label }) => {
  const [edit, setEdit] = useState(false);
  const [newField, setNewField] = useState("");
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    const res = await axios.patch(
      `/user/details`,
      {
        fieldToUpdate: label.toLowerCase(),
        value: newField,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    // alert(res.data.msg)
    setMessage(res.data.msg);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  return (
    <div className="flex gap-2">
      <div className="flex justify-between w-1/2 gap-5 items-center">
        <label className="text-xl">{label}</label>
        <div className="h-10 w-2/3 flex items-center justify-between px-3 bg-white/15 border border-black text-white rounded-lg">
          <div className="w-full">
            {edit ? (
              <input
                className="bg-transparent h-10 cursor-pointer w-full  outline-none placeholder:text-black"
                placeholder={`New ${label}`}
                onChange={(e) => setNewField(e.target.value)}
              />
            ) : (
              `${field}`
            )}
          </div>
          <button
            onClick={() => {
              setEdit((prev) => !prev);
            }}
            className="text-xl h-10 w-10 flex items-center justify-center cursor-pointer"
          >
            {!edit ? <MdEdit /> : <MdOutlineEditOff />}
          </button>
        </div>
      </div>
      {edit ? <button onClick={handleClick}>Save</button> : ""}
      {message}
    </div>
  );
};
export default Account;
