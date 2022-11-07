import { useState } from "react";

export const updateDB = async () => {

  const asHeaders = {
   
        method: "get",
        headers: {
            authorization: localStorage.getItem("token"),
            tasks: localStorage.getItem("tasks"),
          "Content-Type": "application/json",
            credentials: 'include',

      
        },
      };
  await fetch("http://localhost:3500/auth/update", asHeaders)

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
  