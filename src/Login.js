import React, { useState, useContext, useEffect } from "react";
import { taskContext } from "./taskContext";
import { authCheck } from "./authCheck";
function Login() {
  const { token, setToken } = useContext(taskContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [result, setResult] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "true",
      },

      body: JSON.stringify({ username: username, password: password }),
    };
    await fetch("http://localhost:3500/auth/login", requestOptions)
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        setToken(data.token);

        localStorage.setItem("token", data.token);
        authCheck();
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
    <>
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
          Log in
        </button>
        <h3>{result}</h3>
      </form>
    </>
  );
}

export default Login;
