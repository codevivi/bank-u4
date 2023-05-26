import { createContext } from "react";
import useMessages from "../hooks/useMessages";
import useStats from "../hooks/useStats";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [stats, updateStats] = useStats(addMsg);

  return (
    <GlobalContext.Provider
      value={{
        messages: messages,
        addMsg: addMsg,
        deleteMsg: deleteMsg,
        deleteAllMsg: deleteAllMsg,
        stats: stats,
        updateStats: updateStats,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
