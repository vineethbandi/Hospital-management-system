import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, tryLoggingOut } from "./log";

const ProtectedRoute = (props: any) => {
  let [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUser().then((user: any) => {
      setUser(user);
      console.log("protected route user", user);
      if (user === undefined || user === null || user.type !== props.type) {
        console.warn("redirecting to /login");
        navigate("/login");
      } else {
        // render the page
      }
    });
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 place-items-center shadow-lg px-6">
          <h1 className="justify-self-start text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
            Welcome {user?.name}!
          </h1>
          <button
            onClick={async () => {
              tryLoggingOut(navigate);
            }}
            className=" justify-self-end red "
          >
            Log Out
          </button>
        </div>
        {user?.type === props.type && props.children}
      </div>
    </>
  );
};
export default ProtectedRoute;
