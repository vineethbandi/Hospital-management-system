import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, tryLoggingIn } from "../log";

function Login() {
  let [tries, setTries] = useState(0);
  let navigate = useNavigate();
  return (
    <>
      <form
        onSubmit={async (e) => {
          console.log("login");
          e.preventDefault(); //don't refresh
          //try to login and get user object
          let status = await tryLoggingIn(
            (e.target as any).username.value,
            (e.target as any).password.value,
            navigate
          );
          if (status === "error") setTries(tries + 1);
        }}
        className="fixed w-screen h-screen grid place-content-center bg-slate-300 text-gray-700 overflow-y-auto"
      >
        <h1 className="font-bold text-center text-3xl uppercase m-6">Login</h1>
        <span className="grid place-content-center gap-1 p-4 bg-slate-100  rounded-md shadow-xl mx-auto">
          <label className=" text-gray-600">Username</label>
          <input type="text" name="username" autoComplete="off" />
          <label className="mt-2 text-gray-600">Password</label>
          <input type="password" name="password" autoComplete="off" />
          <div
            className="text-red-500 mt-1"
            style={{ opacity: tries == 0 ? "0" : "1" }}
          >
            Invalid credentials
          </div>
          <button
            type="submit"
            className="
           orange mt-2
            "
          >
            Login
          </button>
        </span>
      </form>
    </>
  );
}

export default Login;
