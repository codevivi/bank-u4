import { useCallback, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../Contexts/AuthCtx";
import { SERVER_BASE_PATH } from "../utils/config";
const URL = SERVER_BASE_PATH + "/logout";

function useLogout() {
  const { setAuthState } = useContext(AuthCtx);
  const [sendLogout, setSendLogout] = useState(false);
  const navigate = useNavigate();
  const logout = useCallback(() => {
    setSendLogout(true);
  }, []);

  useEffect(() => {
    if (!sendLogout) {
      return;
    }
    axios
      .get(URL, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setSendLogout(false);
          setAuthState({});
          navigate("/");
        }
      })
      .catch((e) => {
        //add error message to clear cookies manually
        console.log(e);
      });
  }, [sendLogout, setAuthState, navigate]);

  return [logout];
}

export default useLogout;
