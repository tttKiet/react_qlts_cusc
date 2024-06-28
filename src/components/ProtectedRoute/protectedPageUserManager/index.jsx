import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermittedPage from "../NotPermittedPage";

const RoleBaseRoute = (props) => {
  const isUerManagerRoute = window.location.pathname.startsWith("/usermanager");
  const user = useSelector((state) => state.account.user);
  const userRole = user?.ROLE;

  if (isUerManagerRoute && userRole === "USERMANAGER") {
    return <>{props.children}</>;
  } else {
    return <NotPermittedPage />;
  }
};

function ProtectedRouteUserManager(props) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default ProtectedRouteUserManager;
