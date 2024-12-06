import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Report from "./Components/Report";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import { UserProvider } from "./Utlis.js/UserContext";
import Summery from "./Components/Summery";

function AppLayout() {
  return (
    <div className="h-screen" >
      <UserProvider>
      <Header />
      <Outlet /> </UserProvider>
    </div>
  );
}

function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />, 
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path:"/report",
          element:<Report/>
        },
        {
          path:"/summary",
          element:<Summery/>
        }
      ],
    },
  ]);

  return <RouterProvider router={appRoute} />;
}

export default App;
