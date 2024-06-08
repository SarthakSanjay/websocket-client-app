import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit, MdOutlineEditOff } from "react-icons/md";
import { TOKEN } from "../utils/util";
import { useRecoilValueLoadable } from "recoil";
import { fetchSelfDetails } from "../atom/atom";

interface user {
    id:number,
    username : string,
    email : string
}
const Account = () => {

  const userLoadable = useRecoilValueLoadable(fetchSelfDetails);
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    if (userLoadable.state === 'hasValue') {
      setUser(userLoadable.contents);
    }
  }, [userLoadable]);
  
  return (
    <div
      className={`h-full w-[65%] flex flex-col rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 dark:bg-purple-950  p-4`}
    >
      <h1 className="text-3xl">Account</h1>
      <div className="flex gap-2 flex-col my-4 h-full w-full p-4">
        <Fields field={user?.username}  label={"Username"}/>
        <Fields field={user?.email}  label={"Email"}/>
      </div>
    </div>
  );
};

interface FieldsProp {
    field ?: string
    label : string
}

const Fields :React.FC<FieldsProp> = ({ field, label }) => {
  const [edit, setEdit] = useState(false);
  const [newField , setNewField] = useState('')
  const [message , setMessage] = useState('')
    const handleClick = async() =>{
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/user/details`,{
            fieldToUpdate : label.toLowerCase(),
            value:newField
        } , {
            headers : {
                Authorization:`Bearer ${TOKEN}`
            }
        })
        // alert(res.data.msg)
        setMessage(res.data.msg)

        setTimeout(()=>{
            setMessage('')
        },2000)

    }
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
              onChange={(e) => setNewField(e.target.value) }
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
    {edit ? 
      <button onClick={handleClick}>Save</button>
      : ''
    }
    {message}
    </div>
  );
}
export default Account;
