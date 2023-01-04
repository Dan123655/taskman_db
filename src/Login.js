import React, { useState, useContext } from "react";
import { taskContext } from "./taskContext";

function Login() {
  const { login, setLogin,} = useContext(taskContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loginLog,setLoginLog,setRegLog, signButton, setSignButton,setRegButton } = useContext(taskContext);
  // const [result,setResult] = useState('')

  const SignOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const signIn = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-origin': 'https://dan123655.github.io/taskman_db',
    
    },

      body: JSON.stringify({ username: username, password: password }),
    };
    // await fetch("http://localhost:3500/api/login", requestOptions)
    await fetch("https://node-auth-seven.vercel.app/api/login", requestOptions)
      .then((res) => res.json())

      .then((data) => {
        if (data.tokensent) {
          localStorage.setItem("token", data.token);
          setLogin(true);
          // console.log(data.token);
          window.location.reload();
          console.log(data)
        }
        
        // if (data.notfound) { setLoginLog(<h3>user {data.username} was not found</h3>)}
        else if (data.wrongpassword) { setLoginLog(<h3>Incorrect password</h3>)}
        else if (data.notFound) { setLoginLog(<h3>{`Cannot find user named ${data.thisUser}`}</h3>)}
        else if (data.error) { setLoginLog(<h3>login error. try again later</h3>)}
      })

      .catch((err) => {
        console.log(err);
      });

  };
  const handleSubmit = (e) => {
    // console.log(username, password);
    // console.log("handlesubmit");
    signIn(e);
  };

  const button = () => {
    setSignButton(true);
    setRegButton(false)
    setRegLog(<></>)
  };

  return (
    <>
      {!login ? (
        <>
          {signButton ? (
            <>
              {!login ? (
                <>
                  {
                    <form id="myform2" onSubmit={handleSubmit}>
                      <label htmlFor="login"></label>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="login"
                        placeholder="login"
                        id="login"
                        name="login"
                      ></input>
                      <label htmlFor="password"></label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="password"
                        id="password"
                        name="password"
                      ></input>
                      <button id="myform2" type="submit">
                        Ok
                      </button>
                      <>{loginLog}</>
                    </form>
                  }
                </>
              ) : (
                <>
                  <button id="0" className="signout" onClick={SignOut}>
                    Sign Out
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button className="signbut" onClick={button}>
                Sign In
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button id="1" className="signout" onClick={SignOut}>
            Sign Out
          </button>
        </>
      )}{" "}
    </>
  );
}

export default Login;
