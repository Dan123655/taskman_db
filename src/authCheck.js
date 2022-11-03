export const authCheck = async () => {
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
        console.log(data);
        localStorage.setItem("tasks", JSON.stringify(data));
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
