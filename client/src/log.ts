import { NavigateFunction } from "react-router-dom";
import { login } from "./API";

export let tryLoggingIn = async (
  username: string,
  password: string,
  navigate?: NavigateFunction
) => {
  console.log("hello");
  let user = await login(username, password);
  console.log(user);
  if (user.status === "error") return "error";
  await localStorage.setItem("user", JSON.stringify(user));
  if (navigate) {
    console.warn("redirecting to /" + user.type);
    navigate("/" + user.type);
  }
  return "logged in";
};

export let getUser = async () => {
  let user = await localStorage.getItem("user");
  if (user === null) {
    return null;
  }
  let parsedUser = JSON.parse(user) as any;
  if (parsedUser.status === "ok") return parsedUser;
};

export let tryLoggingOut = async (navigate?: NavigateFunction) => {
  await localStorage.removeItem("user");
  if (navigate) {
    console.warn("redirecting to /");
    navigate("/");
  }
};
