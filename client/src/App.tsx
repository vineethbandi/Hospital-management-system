import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Doctor from "./routes/Doctor";
import DataEntry from "./routes/DataEntry";
import FrontDesk from "./routes/FrontDesk";
import Admin from "./routes/Admin";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/doctor",
      element: (
        <ProtectedRoute type={"doctor"}>
          <Doctor />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dataentry",
      element: (
        <ProtectedRoute type={"dataentry"}>
          <DataEntry />
        </ProtectedRoute>
      ),
    },
    {
      path: "/frontdesk",
      element: (
        <ProtectedRoute type={"frontdesk"}>
          <FrontDesk />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute type={"admin"}>
          <Admin />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
