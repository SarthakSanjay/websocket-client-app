import axios from "axios";
import { useState } from "react";
import { setToken } from "../utils/util";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
  const [credential, setCredential] = useState("");
  const [password , setPassword] = useState("")
  const [passwordVisible , setPasswordVisible] = useState(false)
  const [error , setError] = useState("")
  const navigate = useNavigate()

  const handleCredential = (e: any) => {
    setCredential(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClick = async() => {
   try {
    let res = await axios.post(`/user/login`,{
       credential:credential,
       password:password
     })
     if (res.status === 200) {
      setToken(res.data.token)
      alert('User logged in succesfully')
      setPassword('')
      setCredential('')
      setError('')
    }

  } catch (error:any) {
    if (error.response && error.response.status > 400) {
      setError(error.response.data.msg);
    } else {
      console.log(error.message);
      setError('An unexpected error occurred.');
    }
   }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black relative">
      <h1 className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent text-3xl absolute top-28">Login</h1>
      <div className="h-max w-[500px] py-4 bg-gradient-to-r from-violet-600 to-indigo-600  border-white rounded-lg flex justify-center items-center flex-col gap-10
      shadow-2xl shadow-black">
        <div className="flex flex-col w-full items-center">
          <label className="self-start ml-14 my-1 text-white text-xl">Username or Email</label>
          <input 
            value={credential}
          placeholder="username" 
          className="h-10 w-[80%] px-4 border  border-black rounded-lg bg-black/30 outline-none text-white"
          onChange={handleCredential}
          autoFocus />
        </div>
       
        <div className="flex flex-col w-full items-center relative">
          <label className="self-start ml-14 my-1 text-white text-xl">Password</label>
          <input
            value={password}
            placeholder="password"
            type={passwordVisible ? 'text': 'password'} 
            className="h-10 w-[80%] px-4 border  border-black rounded-lg bg-black/30 outline-none text-white"
            onChange={handlePassword}
          />
          <span
           className="absolute flex justify-center items-center h-10 w-10 cursor-pointer right-12 bottom-0 text-3xl"
           onClick={()=>{
            setPasswordVisible(prev => !prev)
           }}
           >{passwordVisible ? '👀' : '🙈'}</span>
        </div>
        {error && <div className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-xl">{error}</div>}
        <button className="bg-gradient-to-r from-red-500 to-orange-500 h-10 w-max px-4 rounded-lg text-white hover:scale-105 transition-all ease-in " onClick={handleClick}>Login</button>
      <div className="text-white h-10 w-max px-3">Don't have an Account? <button className="px-3 py-1 border border-transparent hover:border-white m-1 rounded-lg bg-black/35 " onClick={()=>{navigate('/register')}}>Register</button> </div>
      </div>
    </div>
  );
};

export default Login;
