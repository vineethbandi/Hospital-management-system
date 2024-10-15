import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../log";

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    getUser().then((user: any) => {
      console.log(user);
      if (user === null || user === undefined) {
        navigate("/login");
      } else if (user.status === "ok") {
        console.warn(`redirecting to :/${user.type}`);
        navigate("/" + user.type);
      }
    });
  }, []);
  return <div>not implemented yet</div>;
}

export default Home;
