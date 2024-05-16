import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {};
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-[400px] w-[500px]  border-white rounded-lg flex justify-center items-center flex-col gap-10
      shadow-2xl shadow-black">
        <div className="flex flex-col w-full items-center">
          <label className="self-start ml-14 my-3">Username</label>
          <input 
          placeholder="username" 
          className="h-10 w-[80%] px-10"
          onChange={handleUsername}
          autoFocus />
        </div>
        <div className="flex flex-col w-full items-center">
          <label className="self-start ml-14 my-3">Email</label>
          <input
            placeholder="example.gmail.com"
            type="email"
            className="h-10 w-[80%] px-10"
            onChange={handleEmail}
          />
        </div>
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
};

export default Register;
