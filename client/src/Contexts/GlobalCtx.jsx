import { createContext } from "react";
import useMessages from "../hooks/useMessages";
import usePublicStats from "../hooks/usePublicStats";
import useFileReader from "../hooks/useFileReader";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [messages, addMsg, deleteMsg, deleteAllMsg] = useMessages();
  const [publicStats, updatePublicStats] = usePublicStats(addMsg);
  const [fileInput, inputFileForDisplay, readInputFile, removeInputFile, setInputFileForDisplay] = useFileReader();

  return (
    <GlobalContext.Provider
      value={{
        messages: messages,
        addMsg: addMsg,
        deleteMsg: deleteMsg,
        deleteAllMsg: deleteAllMsg,
        publicStats: publicStats,
        updatePublicStats: updatePublicStats,
        fileInput: fileInput,
        inputFileForDisplay: inputFileForDisplay,
        readInputFile: readInputFile,
        removeInputFile: removeInputFile,
        setInputFileForDisplay: setInputFileForDisplay,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
