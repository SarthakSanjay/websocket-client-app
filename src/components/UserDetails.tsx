import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { convertToUppercase, TOKEN } from "../utils/util"
import { User } from "./SearchModal"

const UserDetails = () => {
  const [user, setUser] = useState<User>({id:0,username:'',email:''})
  const {id} = useParams()
  const [images , setImages] = useState([1,2,3,4,5])
  const [files ,setFiles] = useState([1,2,3,5,1,3,4,5])
  useEffect(()=>{
    async function fetchUserDetails() {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${id}`,{
        headers:{
          Authorization: `Bearer ${TOKEN}`
        }
      })
      setUser(res.data.user)

    }
    if(id){
      fetchUserDetails()
    }
  },[id])
  return (
    <div className="h-full w-[30%]  bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-3xl p-3
    flex items-center flex-col">
      <h1 className="text-xl text-white my-2">Info</h1>
      <img src="https://www.github.com/sarthaksanjay.png" 
        className="h-44 w-44 rounded-full"
      />
        <span className="text-black text-2xl p-2">{convertToUppercase(user.username)}</span>
        <span className="text-gray-800 text-lg p-2">{user.email}</span>
        <div className="h-40 w-full border-t">
          <h1 className="h-1/3 text-xl ml-7 flex items-end">Media</h1>
          <div className=" h-2/3 w-full flex gap-1 justify-center items-center">
            {images.slice(0,3).map((link) =>{
              return <img src={'https://www.github.com/sarthaksanjay.png'} className="h-20 w-20 rounded-lg" />
            })}
            <div className="h-20 w-20 border flex p-4 cursor-pointer items-center rounded-lg hover:bg-black/35">show more</div>
          </div>
        </div>
        <div className="h-52 w-full border-t ">
          <h1 className="text-xl ml-7 my-2 flex items-end">Files</h1>
          <div className=" h-44 w-full  flex gap-2 overflow-y-scroll flex-col">
            {files.map((link) =>{
              return <div className="h-14 w-full border-b rounded-lg p-2" >
                files
              </div>
           })}
          </div>
        </div>
    </div>
  )
}

export default UserDetails