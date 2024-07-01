import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedLogin({ children }) {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>{children}</>
      ) : (
        <Navigate to="/#" replace />
      )}
    </>
  );
}

export default ProtectedLogin;
