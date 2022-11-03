import React, { useContext } from 'react';
import { taskContext } from './taskContext';
import { useState, useEffect } from "react";
import { BsBook, BsEye, BsEyeSlash } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { SiEgghead } from "react-icons/si";
import Login from './Login';
import Register from './Register';
import { authCheck } from './authCheck';

function App() {

const [token, setToken] = useState('')
  const [bearer, setBearer] = useState('')
  const [loginData, setLoginData] = useState('')


const [newToken, setNewToken] = useState('')





  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("tasks");
    // console.log(localData);
    return localData ? JSON.parse(localData) : [];
  });
  window.onstorage = () => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  };
 
  // useEffect(authCheck(),[tasks]);
  const [input, setInput] = useState("");
  const [popped, setPopped] = useState(false);
  const [egg, setEgg] = useState(false);
  // const [homework, setHomework] = useState(false);
  // const [heClicked, setHeClicked] = useState(false);
  const showOneTimeThenDont = () => {
    setTimeout(() => {
      setPopped(true);
      console.log("just popped or double clicked");
    }, 2000);
  };
  const [hideCompleted, setHideCompleted] = useState(false);

  const toggleHideCompleted = () => {
    setHideCompleted((current) => !current);
    console.log("switched hideCompleted to " + hideCompleted);
  };




  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);







  const HandleSumbit = (e) => {
    e.preventDefault();
    const addTask = {
      id: Math.floor(Math.random() * 10000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
    console.log(JSON.stringify(tasks));
  };

  //Alcron audit

  const handleAlcron = () => {
    var alcronTaskList = [
      "cards",
      "credit limit",
      "cash stays",
      "closures",
      "corrections",
      "adjusted & cancelled payments",
      "audit",
    ];
    const addThis = alcronTaskList.map((alcronItem) => ({
      id: Math.floor(Math.random() * 10000),
      text: alcronItem,
      alcron: true,
      completed: false,
    }));
    console.log(addThis);
    setTasks([...tasks, ...addThis.reverse()]);
    setEgg(true);
  };

  // const handleHomework = (e) => {
  //   if(!heClicked){
  //   var homeworkList = [
  //     "обновить только nextjs",
  //     "завести еслинт в другом проекте",
  //     "добавить gh act для еслинт",
  //     "начать пользоваться pull requests",
  //     "css grids for weather app",
  //     "добавить prettier к еслинту",
  //   ];
  //   const addThis = homeworkList.map((listItem) => ({
  //     id: Math.floor(Math.random() * 10000),
  //     text: listItem,
  //     done: true,
  //     completed: true,
  //   }));
  //   console.log(addThis);
  //   setTasks([...tasks, ...addThis.reverse()]);
  //   setHeClicked((current) => !current);
  //   setHomework(true);}
  // }

  //delete task
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
    setTasks(filteredTasks);
    console.log("deleted ok");
  };

  //toggle completed task
  const toggleComplete = (id, e) => {
    showOneTimeThenDont(e);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 
  return (
    <taskContext.Provider
    value={{
      token,
      setToken,
      bearer,
        setBearer,
        loginData,
        setLoginData,
        tasks,
        setTasks
    }}>
    <div className="App">
      <div className="app-title">
        {!egg ? (
          <h1>
            <BsBook
              className="book-icon"
              onDoubleClickCapture={handleAlcron}
            ></BsBook>{" "}
            Taskman
          </h1>
        ) : (
          <h1>
            <SiEgghead className="book-icon"></SiEgghead> You've discovered the
            Easter Egg. Now do this for you boss:
          </h1>
        )}

        <div className="date">
        {/* {!heClicked?(<div className="homework" onClick={handleHomework}>Is homework done?</div>):
        (<div className="homeworkClicked" onClick={handleHomework}>yep</div>)} */}
          <p>
          
            {!hideCompleted ? (
              <BsEye className="hide-completed" onClick={toggleHideCompleted} />
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
                    onDoubleClick={(e) => {
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
                  onDoubleClick={(e) => {
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
      <Login/>
    </div>
    </taskContext.Provider> );
}

export default App;
