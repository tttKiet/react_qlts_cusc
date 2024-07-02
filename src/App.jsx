import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailCustomer from "./pages/DetailCustomer";
import Login from "./pages/Login";
import LayoutAdmin from "./Layouts/LayoutAdmin/LayoutAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import Footer from "./Layouts/OnlyLayout/Footer";
import ManagerUser from "./pages/ManagerUser";
import ProfileUser from "./pages/ProfileUser";
import ListData from "./pages/ListData";
import SegmentData from "./pages/SegmentData";
import DivisionData from "./pages/DivisionData";
import TimeLogin from "./pages/TimeLogin";
import SegmentDetail from "./pages/SegmentDetail";
import ManagerThematic from "./pages/ManagerThematic";
import DetailData from "./pages/DetailData";
import ProfileAdmin from "./pages/ProfileAdmin";
import EditData from "./pages/EditData";
import CreateData from "./pages/CreateData";
import LayoutUserManager from "./Layouts/LayoutUserManager/LayoutUserManager";
import UserManagerHomePage from "./pages/UserManagerHomePage";
import ProtectedRoute from "./components/ProtectedRoute/protectedPageAdmin";
import ProtectedRouteUserManager from "./components/ProtectedRoute/protectedPageUserManager";
import StatisticalDay from "./pages/StatisticalDay";
import StatisticalContact from "./pages/StatisticalContact";
import StatisticalThematic from "./pages/StatisticalThematic";
import ManagerDataUsermanager from "./pages/ManagerDataUsermanager";
import DetailDataUsermanager from "./pages/DetailDataUsermanager";
import EditDataUsermanager from "./pages/EditDataUsermanager";
import ManagerFile from "./pages/ManagerFile";
import UM_ManagerFile from "./pages/UM_ManagerFile";

const LayoutOnly = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutOnly />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/thongtinkhachhang",
          element: <DetailCustomer />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    // ADMIN
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <LayoutAdmin />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <AdminHomePage />,
        },
        {
          path: "user",
          element: <ManagerUser />,
        },
        {
          path: "detail",
          element: <ProfileUser />,
        },
        {
          path: "add",
          element: <CreateData />,
        },
        {
          path: "data",
          element: <ListData />,
        },
        {
          path: "data/:id",
          element: <DetailData />,
        },
        {
          path: "data/edit/:id",
          element: <EditData />,
        },
        {
          path: "segment",
          element: <SegmentData />,
        },
        {
          path: "segment/:id",
          element: <SegmentDetail />,
        },
        {
          path: "division",
          element: <DivisionData />,
        },
        {
          path: "time",
          element: <TimeLogin />,
        },
        {
          path: "thematic",
          element: <ManagerThematic />,
        },
        {
          path: "profile",
          element: <ProfileAdmin />,
        },
        {
          path: "statistical/day",
          element: <StatisticalDay />,
        },
        {
          path: "statistical/contact",
          element: <StatisticalContact />,
        },
        {
          path: "statistical/thematic",
          element: <StatisticalThematic />,
        },
        {
          path: "file/manager",
          element: <ManagerFile />,
        },
      ],
    },

    // USER MANAGER
    {
      path: "/usermanager",
      element: (
        <ProtectedRouteUserManager>
          <LayoutUserManager />
        </ProtectedRouteUserManager>
      ),
      children: [
        {
          index: true,
          element: <UserManagerHomePage />,
        },
        {
          path: "data",
          element: <ManagerDataUsermanager />,
        },
        {
          path: "data/:id",
          element: <DetailDataUsermanager />,
        },
        {
          path: "data/edit/:id",
          element: <EditDataUsermanager />,
        },
        {
          path: "file",
          element: <UM_ManagerFile />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
