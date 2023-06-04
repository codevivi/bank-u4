import { useState, useEffect, useCallback } from "react";
import { SERVER_BASE_PATH } from "../utils/config";
import axios from "axios";

function useAuth(addMsg) {
  const [auth, setAuth] = useState(null);
  const [authCheckTime, setAuthCheckTime] = useState(null);

  const checkAuth = useCallback(() => {
    setAuthCheckTime(Date.now());
  }, []);

  const setAuthState = useCallback((objWithUser) => {
    setAuth(objWithUser);
  }, []);

  useEffect(() => {
    if (authCheckTime === null) {
      return;
    }
    axios
      .get(SERVER_BASE_PATH + "/whoAmI", { withCredentials: true })
      .then((res) => {
        setAuth({ user: res.data.user });
      })
      .catch((e) => {
        const res = e.response;
        if (res?.status === 401) {
          addMsg({ type: "error", text: `Esate neprisijungęs` });
          return;
        }
        addMsg({ type: "error", text: "Serverio Klaida atnaujinant prisijugimo būseną." });
      });
  }, [authCheckTime, addMsg]);

  return [auth, setAuthState, checkAuth];
}

export default useAuth;
