import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_PATH } from "../utils/config";

const URL = SERVER_BASE_PATH + "/stats";

function usePublicStats(addMsg) {
  const [publicStats, setPublicStats] = useState(null);
  const [statsUpdateTime, setStatsUpdateTime] = useState(null);

  const updatePublicStats = useCallback(() => {
    setStatsUpdateTime(Date.now());
  }, []);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setPublicStats(res.data.stats);
      })
      .catch((e) => {
        addMsg({ type: "error", text: "Serverio klaida, nepavyko gauti statistikos" });
      });
  }, [statsUpdateTime, addMsg]);

  return [publicStats, updatePublicStats];
}

export default usePublicStats;
