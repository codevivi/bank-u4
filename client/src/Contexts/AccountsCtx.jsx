import { createContext, useContext, useEffect } from "react";
import useAccounts from "../hooks/useAccounts";
import { GlobalContext } from "./GlobalCtx";
import usePrivateStats from "../hooks/usePrivateStats";

export const AccountsContext = createContext({});

export function AccountsProvider({ children }) {
  const { addMsg } = useContext(GlobalContext);
  const [privateStats, updatePrivateStats] = usePrivateStats(addMsg);
  const [message, accounts, setAccounts, displayAccounts, setDisplayAccounts, filterFunc, setFilterFunc, setNewAccount, setDeleteAccount, setUpdateAccount, changed, payTax, setDeleteDocument] = useAccounts();

  useEffect(() => {
    if (message === null) {
      return;
    }
    addMsg(message);
  }, [message, addMsg]);

  return <AccountsContext.Provider value={{ accounts, setAccounts, displayAccounts, setDisplayAccounts, filterFunc, setFilterFunc, setNewAccount, setDeleteAccount, setUpdateAccount, changed, privateStats, updatePrivateStats, payTax, setDeleteDocument }}>{children}</AccountsContext.Provider>;
}
