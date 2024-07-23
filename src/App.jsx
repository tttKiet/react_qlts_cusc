import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute/protectedPageAdmin";
import ProtectedRouteUserManager from "./components/ProtectedRoute/protectedPageUserManager";
import LayoutAdmin from "./Layouts/LayoutAdmin/LayoutAdmin";
import LayoutUserManager from "./Layouts/LayoutUserManager/LayoutUserManager";
import Footer from "./Layouts/OnlyLayout/Footer";
import AdminHomePage from "./pages/AdminHomePage";
import CreateData from "./pages/CreateData";
import DetailCustomer from "./pages/DetailCustomer";
import DetailData from "./pages/DetailData";
import DetailDataUsermanager from "./pages/DetailDataUsermanager";
import DivisionData from "./pages/DivisionData";
import EditData from "./pages/EditData";
import EditDataUsermanager from "./pages/EditDataUsermanager";
import HomePage from "./pages/HomePage";
import ListData from "./pages/ListData";
import Login from "./pages/Login";
import ManagerDataUsermanager from "./pages/ManagerDataUsermanager";
import ManagerThematic from "./pages/ManagerThematic";
import ManagerThematicUsermanager from "./pages/ManagerThematicUsermanager";
import ManagerUser from "./pages/ManagerUser";
import ProfileAdmin from "./pages/ProfileAdmin";
import ProfileUser from "./pages/ProfileUser";
import SegmentData from "./pages/SegmentData";
import SegmentDetail from "./pages/SegmentDetail";
import StatisticalContact from "./pages/StatisticalContact";
import StatisticalDay from "./pages/StatisticalDay";
import StatisticalThematic from "./pages/StatisticalThematic";
import TimeLogin from "./pages/TimeLogin";
import UserManagerHomePage from "./pages/UserManagerHomePage";
import Story from "./pages/Story";
import { useEffect } from "react";
import ManagerFile from "./pages/ManagerFile";
import UM_ManagerFile from "./pages/UM_ManagerFile";
import UM_ManagerThematic from "./pages/UM_ManagerThematic";
import authService from "./service/AuthService";
import { API_AUTH } from "./constants";
import ProfileUserManager from "./pages/ProfileUserManager";
const LayoutOnly = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    const handleBeforeUnload = async () => {
      navigator.sendBeacon(`${API_AUTH}/logout`);
      authService.logout();
    };

    const handleUnload = async () => {
      navigator.sendBeacon(`${API_AUTH}/logout`);
      authService.logout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  });

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
          path: "story",
          element: <Story />,
        },
        {
          path: "user/:id",
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
          path: "division/:id",
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
          path: "file",
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
        {
          path: "thematic",
          element: <UM_ManagerThematic />,
        },
        {
          path: "profile",
          element: <ProfileUserManager />,
        },

        // {
        //   path: "thematic",
        //   element: <ManagerThematicUsermanager />,
        // },
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
