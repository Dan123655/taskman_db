import React, { useState, useContext,} from "react";
import { taskContext } from "./taskContext";


function Login() {
  const { login, setLogin, tasks, setTasks } = useContext(taskContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signButton, setSignButton } = useContext(taskContext);


  const SignOut = () => {
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
        
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLogin(true)
          console.log(data.token);
          window.location.reload();

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

  }


  const button = () => {
    setSignButton(true)
   

  };

  return (
    <>{!login?<>
      {signButton ? <>
        {!login ?
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
          }</> : <><button className="signout" onClick={SignOut}>Sign Out</button></>}
      
      </> : <><button id="0" className="signbut" onClick={button}>Sign In</button></>}
    </>:<><button id="1" className="signout" onClick={SignOut}>Sign Out</button></>} </>
  );
}

export default Login;
