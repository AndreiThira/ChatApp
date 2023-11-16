import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function RegisterAndLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register")

    const {setUsername: setLoggedInUsername, setId} = useContext(UserContext);


  async function handleSubmit(ev){
    ev.preventDefault();
  const url = isLoginOrRegister === "register" ? "/register" : "/login"
   const {data} =  await axios.post(url, {username, password});
   setLoggedInUsername(username)
   setId(data.id)
  }

  return (
    <div className="bg-blue-100 h-screen flex items-center">
      <form className="w-80 h-80 mx-auto mb-10 pt-10 bg-blue-300 rounded-3xl " onSubmit={handleSubmit}>
        <input
          value={username} 
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="username"
          className="block rounded-sm p-2 mb-5 border w-64 mx-auto text-center "
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="password"
          className="block rounded-sm p-2 mb-5 border w-64 mx-auto text-center"
        />
        <button className="bg-blue-500 text-white block w-64 mx-auto rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-10">
          {isLoginOrRegister === "register" && (
           <div>
           &nbsp;Already a member?
            <button onClick={() => setIsLoginOrRegister("login")} className="text-blue-500 hover:text-blue-800">
            &nbsp;Login
        </button>
           </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
            Don't have an account?
            <button onClick={() => setIsLoginOrRegister("register")} className="text-blue-500 hover:text-blue-800">
            &nbsp;Register
        </button>
           </div>
          )}
      
        </div>
      </form>
    </div>
  );
}
