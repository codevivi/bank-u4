import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthCtx } from "../Contexts/AuthCtx";

const RequireAuth = ({ opposite }) => {
  const { auth, checkAuth } = useContext(AuthCtx);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (auth === null) {
    return null;
  }

  if (opposite) {
    return !auth?.user ? <Outlet /> : <Navigate to={from} state={{ from: location }} replace />;
  }
  return auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

RequireAuth.defaultProps = {
  opposite: false,
};

export default RequireAuth;
