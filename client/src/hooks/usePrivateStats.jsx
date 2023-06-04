import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_PATH } from "../utils/config";
import { AuthCtx } from "../Contexts/AuthCtx";

const URL = SERVER_BASE_PATH + "/private-stats";

function usePrivateStats(addMsg) {
  const { auth } = useContext(AuthCtx);
  const [privateStats, setPrivateStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(null);
  const navigate = useNavigate();

  const updatePrivateStats = useCallback(() => {
    setStatsUpdateTime(Date.now());
  }, []);

  useEffect(() => {
    if (!auth?.user) {
      return;
    }
    axios
      .get(URL)
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setPrivateStats(res.data.stats);
      })
      .catch((e) => {
        const res = e.response;
        if (res.status === 401) {
          navigate("/login");
        }
        addMsg({ type: "error", text: "Serverio klaida, nepavyko gauti statistikos" });
      });
  }, [statsUpdateTime, addMsg, auth]);

  return [privateStats, updatePrivateStats];
}

export default usePrivateStats;
