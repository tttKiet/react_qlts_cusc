import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermittedPage from "../NotPermittedPage";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user?.ROLE;

  if (isAdminRoute && userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermittedPage />;
  }
};

function ProtectedRoute(props) {
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

export default ProtectedRoute;
