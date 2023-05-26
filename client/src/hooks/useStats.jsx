import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_PATH } from "../utils/config";

const URL = SERVER_BASE_PATH + "/stats";

function useStats(addMsg) {
  const [stats, setStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(null);
  // const [message, setMessage] = useState(null);

  const updateStats = useCallback(() => {
    setStatsUpdateTime(Date.now());
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setStats(res.data.stats);
      })
      .catch((e) => {
        addMsg({ type: "error", text: "Serverio klaida, nepavyko gauti statistikos" });
      });
  }, [statsUpdateTime, addMsg]);

  return [stats, updateStats];
}

export default useStats;
