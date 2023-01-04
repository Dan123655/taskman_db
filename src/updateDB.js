export const updateDB = async (currentTasks) => {
const tasksToSend =JSON.stringify(currentTasks)
  const asHeaders = {
   
        method: "post",
        headers: {
            authorization: localStorage.getItem("token"),
            tasks: tasksToSend,
          "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'https://node-auth-seven.vercel.app',
            // credentials: 'include',

      
    },
    // credentials:'include',
    body:  JSON.stringify({ newTasks:tasksToSend})
      };
  // await fetch("http://localhost:3500/api/update", asHeaders)
  await fetch("https://node-auth-seven.vercel.app/api/update", asHeaders)
  // await fetch("https://dan123655.github.io/api/update", asHeaders)

    .then((res) => res.json())
    .then((data) => console.log(data.message))
  
    //  .then((data) => console.log(data))
               
               
            //   else { localStorage.clear() }

        // .then(() => {
        //   window.location.reload(false);
        // })
        .catch((err) => {
          console.log(err);
        });

  };
  