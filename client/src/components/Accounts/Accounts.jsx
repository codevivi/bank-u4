import { useEffect, useState } from "react";
import { useContext } from "react";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { GlobalContext } from "../../Contexts/GlobalCtx";
import AddAccount from "./AddAccount";
import OneAccountRow from "./OneAccountRow";
import Filter from "./Filter";
import AllStats from "./AllStats";
import Sort from "./Sort";

export default function Accounts() {
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const { accounts, displayAccounts, setNewAccount, setDeleteAccountId, setUpdateAccount, changed, privateStats, updatePrivateStats, payTax } = useContext(AccountsContext);
  const { publicStats, updatePublicStats } = useContext(GlobalContext);

  useEffect(() => {
    if (!changed) {
      return;
    }
    updatePublicStats();
    updatePrivateStats();
  }, [changed, updatePublicStats, updatePrivateStats]);

  const handleTax = () => {
    payTax();
  };

  if (accounts === null || displayAccounts === null) {
    return (
      <section className="accounts">
        <h1 style={{ fontSize: "48px" }}>Loading...</h1>
      </section>
    );
  }
  return (
    <section className="accounts">
      <h1>Sąskaitos</h1>
      <div className="top">
        <AllStats publicStats={publicStats} privateStats={privateStats} />
        <div className="buttons">
          <button className="open-btn" onClick={() => setAddAccountModalOpen(true)}>
            Pridėti sąskaitą
          </button>
          {accounts && accounts.length > 0 && (
            <button className="orange" onClick={handleTax}>
              Mokesčiai
            </button>
          )}
        </div>
      </div>
      {accounts?.length > 0 && (
        <>
          <Filter />
          <Sort />
          <ul className="accounts-list">{displayAccounts.map((account) => (account.show ? <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} /> : null))}</ul>
        </>
      )}
      {addAccountModalOpen && <AddAccount setAddAccountModalOpen={setAddAccountModalOpen} setNewAccount={setNewAccount} />}
    </section>
  );
}
