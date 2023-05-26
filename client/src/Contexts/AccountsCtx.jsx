import { createContext, useContext, useEffect } from "react";
import useAccounts from "../hooks/useAccounts";
import { GlobalContext } from "./GlobalCtx";

export const AccountsContext = createContext({});

export function AccountsProvider({ children }) {
  const { addMsg } = useContext(GlobalContext);
  const [message, accounts, setAccounts, displayAccounts, setDisplayAccounts, filterFunc, setFilterFunc, setNewAccount, setDeleteAccount, setUpdateAccount, changed] = useAccounts();

  useEffect(() => {
    if (message === null) {
      return;
    }
    addMsg(message);
  }, [message, addMsg]);

  return <AccountsContext.Provider value={{ accounts, setAccounts, displayAccounts, setDisplayAccounts, filterFunc, setFilterFunc, setNewAccount, setDeleteAccount, setUpdateAccount, changed }}>{children}</AccountsContext.Provider>;
}
