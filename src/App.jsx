import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@nextui-org/react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailCustomer from "./pages/DetailCustomer";
import Login from "./pages/Login";
import LayoutAdmin from "./Layouts/LayoutAdmin/LayoutAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import Footer from "./Layouts/OnlyLayout/Footer";
import ManagerUser from "./pages/ManagerUser";

const LayoutOnly = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  )
}


function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutOnly />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ]

    },
    {
      path: '/thongtinkhachang',
      element: <DetailCustomer />,

    },
    {
      path: '/admin/login',
      element: <Login />,

    },
    {
      path: '/admin',
      element: <LayoutAdmin />,
      children: [{
        index: true,
        element: <AdminHomePage />
      },
      {
        path: "manager/user",
        element: <ManagerUser />
      }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
