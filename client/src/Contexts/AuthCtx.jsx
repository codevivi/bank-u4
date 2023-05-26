import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { GlobalContext } from "./GlobalCtx";

export const AuthCtx = createContext({});

export const AuthProvider = ({ children }) => {
  const { addMsg } = useContext(GlobalContext);
  const [auth, setAuthState, checkAuth] = useAuth(addMsg);

  return <AuthCtx.Provider value={{ auth, setAuthState, checkAuth }}>{children}</AuthCtx.Provider>;
};
