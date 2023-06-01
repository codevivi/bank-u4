import { createContext, useContext, useEffect } from "react";
import useAccounts from "../hooks/useAccounts";
import { GlobalContext } from "./GlobalCtx";
import usePrivateStats from "../hooks/usePrivateStats";
import useDisplayAccounts from "../hooks/useDisplayAccounts";

export const AccountsContext = createContext({});

export function AccountsProvider({ children }) {
  const { addMsg } = useContext(GlobalContext);
  const [privateStats, updatePrivateStats] = usePrivateStats(addMsg);
  const [message, accounts, setAccounts, setNewAccount, setDeleteAccount, setUpdateAccount, changed, payTax, setDeleteDocument, modifyOneAccount] = useAccounts();
  const [displayAccounts, filter, applyFilter, sort, applySort, resetDisplayAccounts] = useDisplayAccounts(null);

  useEffect(() => {
    if (message === null) {
      return;
    }
    addMsg(message);
  }, [message, addMsg]);

  useEffect(() => {
    if (accounts === null) {
      return;
    }
    resetDisplayAccounts(accounts);
  }, [accounts, resetDisplayAccounts]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts, displayAccounts, filter, applyFilter, sort, applySort, setNewAccount, setDeleteAccount, setUpdateAccount, changed, privateStats, updatePrivateStats, payTax, setDeleteDocument, modifyOneAccount }}>{children}</AccountsContext.Provider>
  );
}
