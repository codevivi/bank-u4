import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { SERVER_BASE_PATH } from "../utils/config";
import { AuthCtx } from "../Contexts/AuthCtx";

const URL = SERVER_BASE_PATH + "/private-stats";

function usePrivateStats(addMsg) {
  const { auth } = useContext(AuthCtx);
  const [privateStats, setPrivateStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(null);

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
        console.log(e);
        addMsg({ type: "error", text: "Serverio klaida, nepavyko gauti statistikos" });
      });
  }, [statsUpdateTime, addMsg, auth]);

  return [privateStats, updatePrivateStats];
}

export default usePrivateStats;
