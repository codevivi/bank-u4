import { createContext } from "react";
import useMessages from "../hooks/useMessages";
import usePublicStats from "../hooks/usePublicStats";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [publicStats, updatePublicStats] = usePublicStats(addMsg);

  return (
    <GlobalContext.Provider
      value={{
        messages: messages,
        addMsg: addMsg,
        deleteMsg: deleteMsg,
        deleteAllMsg: deleteAllMsg,
        publicStats: publicStats,
        updatePublicStats: updatePublicStats,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
