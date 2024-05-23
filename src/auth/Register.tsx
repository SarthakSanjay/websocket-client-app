import axios from "axios";
import { useState } from "react";
import Cookies from 'js-cookie'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("")
  const [passwordVisible , setPasswordVisible] = useState(false)
  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,{
      username:username,
      email:email,
      password:password
    })
    .then(res =>{2
      Cookies.set('Token',res.data.registeredUser.token)
      alert('user registered')
    })
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black relative">
      <h1 className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent text-3xl absolute top-28">Register</h1>
      <div className="h-max w-[500px] py-4 bg-gradient-to-r from-violet-600 to-indigo-600  border-white rounded-lg flex justify-center items-center flex-col gap-10
      shadow-2xl shadow-black">
        <div className="flex flex-col w-full items-center">
          <label className="self-start ml-14 my-1 text-white text-xl">Username</label>
          <input 
          placeholder="username" 
          className="h-10 w-[80%] px-4 border border-black rounded-lg bg-transparent outline-none text-white"
          onChange={handleUsername}
          autoFocus />
        </div>
        <div className="flex flex-col w-full items-center">
          <label className="self-start ml-14 my-1 text-white text-xl">Email</label>
          <input
            placeholder="example.gmail.com"
            type="email"
            className="h-10 w-[80%] px-4 border border-black rounded-lg bg-transparent outline-none text-white"
            onChange={handleEmail}
          />
        </div>
        <div className="flex flex-col w-full items-center relative">
          <label className="self-start ml-14 my-1 text-white text-xl">Password</label>
          <input
            placeholder="password"
            type={passwordVisible ? 'text': 'password'} 
            className="h-10 w-[80%] px-4 border border-black rounded-lg bg-transparent outline-none text-white"
            onChange={handlePassword}
          />
          <span
           className="absolute flex justify-center items-center h-10 w-10 cursor-pointer right-12 bottom-0 text-3xl"
           onClick={()=>{
            setPasswordVisible(prev => !prev)
           }}
           >{passwordVisible ? '👀' : '🙈'}</span>
        </div>
        <button className="bg-gradient-to-r from-red-500 to-orange-500 h-10 w-max px-4 rounded-lg text-white hover:scale-105 transition-all ease-in " onClick={handleClick}>Register</button>
      </div>
    </div>
  );
};

export default Register;
