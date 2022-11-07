import React, { useContext } from "react";
import { taskContext } from "./taskContext";
import { useState, useEffect } from "react";
import { BsBook, BsEye, BsEyeSlash } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { SiEgghead } from "react-icons/si";
import Login from "./Login";
// import Register from "./Register";
import { updateDB } from "./updateDB";
// import { authCheck } from './authCheck';
//tasks work, no reload od initial update
function App() {

  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [bearer, setBearer] = useState("");
  const [loginData, setLoginData] = useState("");


  const [reasonToUpdateDB, anyChangeIsA] = useState("default_no_call");

  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("tasks");

    anyChangeIsA(!reasonToUpdateDB);

    return localData ? JSON.parse(localData) : [];
  });
  window.onstorage = () => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
    anyChangeIsA(!reasonToUpdateDB);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    anyChangeIsA(!reasonToUpdateDB);
  }, [tasks]);

  const [input, setInput] = useState("");
  const [popped, setPopped] = useState(false);
  const showOneTimeThenDont = () => {
    setTimeout(() => {
      setPopped(true);
    }, 2000);
  };
  const [hideCompleted, setHideCompleted] = useState(false);

  const toggleHideCompleted = () => {
    setHideCompleted((current) => !current);
    anyChangeIsA(!reasonToUpdateDB);
  };
  const HandleSumbit = (e) => {
    e.preventDefault();
    const addTask = {
      id: Math.floor(Math.random() * 10000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    anyChangeIsA(!reasonToUpdateDB);
    setInput("");
  };
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
    setTasks(filteredTasks);
    anyChangeIsA(!reasonToUpdateDB);
  };
  const toggleComplete = (id, e) => {
    showOneTimeThenDont(e);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    anyChangeIsA(!reasonToUpdateDB);
  };

  const date = new Date();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => { console.log('ran'); if (login === true) { updateDB(); console.log('sending to db') } }, [reasonToUpdateDB]);
  useEffect(()=> async() => {
    const checkOldToken = localStorage.getItem("token");
  
    if (checkOldToken) {
      const reqOptions = {
        method: "get",
        headers: {
          authorization: checkOldToken,
          "Content-Type": "application/json",
          credentials: "true",
        },
      };
      await fetch("http://localhost:3500/auth/tasks", reqOptions)
        .then((res) => res.json())
  
        .then((data) => {
          
          if (data.upd) {console.log('tasks recieved')
            localStorage.setItem('tasks', data.upd);
            if (!login) {
              setLogin(true)
            }
            //THIS IS LEGIT STUPID
            // window.location.reload(false);
  
          }else{setLogin(false)}
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
,[tasks,login])
  return (
    <taskContext.Provider
      value={{token,setToken,bearer,setBearer,loginData,setLoginData,tasks,setTasks,login,setLogin,}}
    >
      <div className="App">
        <div className="app-title">
          <h1>
            <BsBook className="book-icon"></BsBook> Taskman
          </h1>

          <div className="date">
            <p>
              {!hideCompleted ? (
                <BsEye
                  className="hide-completed"
                  onClick={toggleHideCompleted}
                />
              ) : (
                <BsEyeSlash
                  className="hide-completed"
                  color="gray"
                  onClick={toggleHideCompleted}
                />
              )}
            </p>
          </div>
          <form onSubmit={HandleSumbit}>
            <div className="form-input">
              <HiOutlinePlus className="icon-add" onClick={HandleSumbit} />
              <input
                placeholder="Enter a task.."
                type="text"
                value={input}
                maxLength="33"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </form>
          {tasks.length == 1 && !popped ? (
            <div className="popup-task-row">
              <p className="popup-textline" onLoad={showOneTimeThenDont()}>
                double tap to complete
              </p>
            </div>
          ) : (
            <></>
          )}

          {tasks
            .map((task) => {
              if (hideCompleted) {
                if (!task.completed)
                  return (
                    <div
                      className={`${task.completed ? "completed" : "task-row"}`}
                      key={task.id}
                      onDoubleClick={() => {
                        toggleComplete(task.id);
                      }}
                    >
                      <p className="textline">{task.text}</p>
                      <AiOutlineCloseCircle
                        className="icon-delete"
                        onClick={() => deleteTask(task.id)}
                      />
                    </div>
                  );
              } else {
                return (
                  <div
                    className={`${task.completed ? "completed" : "task-row"}`}
                    key={task.id}
                    onDoubleClick={() => {
                      toggleComplete(task.id);
                    }}
                  >
                    <p className="textline">{task.text}</p>
                    <AiOutlineCloseCircle
                      className="icon-delete"
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                );
              }
            })
            .reverse()}
        </div>
        <p className="length">
          {tasks < 1
            ? "You have no tasks for "
            : `You have: ${tasks.length} tasks for `}{" "}
          {days[date.getDay()]} {date.getDate()}, {months[date.getMonth()]}
        </p>
        {/* <Register /> */}
        {!login ? <Login /> : <></>}
      </div>
    </taskContext.Provider>
  );
}

export default App;
