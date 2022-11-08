import React, { useState, useContext,} from "react";
import { taskContext } from "./taskContext";


function Login() {
  const { login, setLogin,tasks,setTasks } = useContext(taskContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const SignOut =()=> {
    localStorage.clear();
    window.location.reload()
   }

 
  const signIn = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },

      body: JSON.stringify({ username: username, password: password }),
    };
    await fetch("http://localhost:3500/auth/login", requestOptions)
      .then((res) => res.json())

      .then((data) => {
        localStorage.setItem("token", data.token);
        if (data.token) {
          setLogin(true)
          console.log(data.token);

        }
        console.log(data);


      })
     
      .catch((err) => {
        console.log(err);
      });

    // .then(data => this.setState({ postId: data.id }))
  };
  const handleSubmit = (e) => {
    console.log(username, password);
    console.log("handlesubmit");
    signIn(e);
    // e.preventdefault();





  };

  return ( 
    <>  {!login?
      <>{
        <form id="myform2" onSubmit={handleSubmit}>
          <label htmlFor="login">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="login"
            placeholder="login"
            id="login"
            name="login"
          ></input>
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            id="password"
            name="password"
          ></input>
          <button id="myform2" type="submit">
            Sign in
          </button>
          <h3></h3>
        </form>
      }</>:<><button onClick={SignOut}>Sign Out</button></>}
      </>);
}

export default Login;
