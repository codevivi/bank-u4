import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { SERVER_BASE_PATH } from "../utils/config.js";

const accountsUrl = SERVER_BASE_PATH + "/accounts";
const documentsUrl = SERVER_BASE_PATH + "/documents";
const taxUrl = accountsUrl + "/pay-tax";

function useAccounts() {
  const [accounts, setAccounts] = useState(null);
  const [accountsUpdateTime, setAccountsUpdateTime] = useState(null);

  const [newAccount, setNewAccount] = useState(null);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [deleteDocument, setDeleteDocument] = useState(null);
  const [updateAccount, setUpdateAccount] = useState(null); //will save object with old(for save if server fails to delete) and new(updated) account
  const [taxPayTime, setTaxPayTime] = useState(null);
  const [changed, setChanged] = useState(false);

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const payTax = useCallback(() => {
    setTaxPayTime(Date.now());
  }, []);

  const modifyOneAccount = useCallback((modified) => {
    setAccounts((prev) => {
      return prev.map((acc) => (acc.id === modified.id ? { ...acc, ...modified } : acc));
    });
  }, []);

  useEffect(() => {
    if (taxPayTime === null) {
      return;
    }
    axios
      .get(taxUrl, { withCredentials: true })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setMessage({ type: "success", text: "Mokesčiai nuskaičiuoti" });
        setAccountsUpdateTime(Date.now());
        setChanged(Date.now()); //for stats need to rename
      })
      .catch((e) => {
        const res = e.response;
        if (!res || res.status === 500) {
          setMessage({ type: "error", text: `Atsiprašome, serverio klaida` });
          return;
        }
        if (res.status === 401) {
          setMessage({ type: "error", text: `Esate neprisijungęs` });
          navigate("/login");
        }
      });
  }, [taxPayTime, navigate]);

  // get from db
  useEffect(() => {
    axios
      .get(accountsUrl, { withCredentials: true })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setAccounts(res.data.accounts);
      })
      .catch((e) => {
        const res = e.response;
        if (!res || res.status === 500) {
          setMessage({ type: "error", text: `Atsiprašome, serverio klaida` });
          return;
        }
        if (res.status === 401) {
          setMessage({ type: "error", text: `Esate neprisijungęs` });
          navigate("/login");
        }
      });
  }, [accountsUpdateTime, navigate]);

  // CREATE add account to db
  useEffect(() => {
    if (newAccount === null) {
      return;
    }
    const formData = new FormData();
    const promiseId = uuid();
    //create fake id and display as created, only with blanked edit options
    setAccounts((accounts) => [...accounts, { ...newAccount.account, promiseId, id: promiseId }]);
    setMessage({ type: "success", text: `Kliento (${newAccount.account.name} ${newAccount.account.surname}) sąskaita  sėkmingai sukurta.` });
    formData.append("name", newAccount.account.name);
    formData.append("surname", newAccount.account.surname);
    formData.append("promiseId", promiseId);
    formData.append("document", newAccount.document);

    axios
      // .post(accountsUrl, { account: newAccount.account, promiseId: promiseId, document: newAccount.file }, { withCredentials: true })
      .post(accountsUrl, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setAccounts((accounts) => accounts.map((account) => (account.promiseId === res.data.promiseId ? { ...account, promiseId: null, documentId: res.data.documentId, id: res.data.id } : { ...account })));
        setChanged(Date.now());
      })
      .catch((e) => {
        //in case server could not save account, remove account from display
        setAccounts((accounts) => accounts.filter((account) => account.promiseId !== promiseId));
        if (e.response.status === 409) {
          setMessage({ type: "error", text: `Sąskaia ${newAccount.account.name} ${newAccount.account.surname} jau egzistuoja.` });
        } else if (e.response.status === 401) {
          setMessage({ type: "error", text: `Esate neprisijungęs` });
        } else {
          setMessage({ type: "error", text: `Atsiprašome, įvyko serverio klaida kuriant sąskaitą (${newAccount.account.name} ${newAccount.account.surname})` });
        }
      });
  }, [newAccount]);

  // DELETE account from db
  useEffect(() => {
    if (deleteAccount === null) {
      return;
    }
    setAccounts((accounts) => accounts.filter((account) => account.id !== deleteAccount.id));

    axios
      .delete(accountsUrl + "/" + deleteAccount.id, { withCredentials: true })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setChanged(Date.now());
      })
      .catch((e) => {
        setAccounts((accounts) => [...accounts, { ...deleteAccount }]);
        const res = e.response;
        if (res.status === 401) {
          setMessage({ type: "error", text: `Esate neprisijungęs. Atsiprašome, įvyko klaida panaikinant sąskaitą (${deleteAccount.name} ${deleteAccount.surname})` });
          return;
        }
        setMessage({ type: "error", text: `Atsiprašome, įvyko klaida panaikinant sąskaitą (${deleteAccount.name} ${deleteAccount.surname})` });
      });
  }, [deleteAccount]);

  // UPDATE account in db
  useEffect(() => {
    if (updateAccount === null) {
      return;
    }
    const promiseId = uuid();
    setAccounts((accounts) => accounts.map((account) => (account.id === updateAccount.old.id ? { ...account, ...updateAccount.changed, promiseId } : { ...account }))); //old and new id same

    axios
      .put(accountsUrl + "/" + updateAccount.old.id, { account: updateAccount.changed, promiseId }, { withCredentials: true })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setAccounts((accounts) => accounts.map((account) => (account.promiseId === res.data.promiseId ? { ...account, promiseId: null } : { ...account })));
        setChanged(Date.now());
      })
      .catch((e) => {
        //if save edit in server did not happen restore previous account
        setAccounts((accounts) => accounts.map((account) => (account.promiseId === promiseId ? { ...updateAccount.old } : { ...account })));

        const res = e.response;
        if (res.status === 401) {
          setMessage({ type: "error", text: `Esate Neprisijungęs. Atsiprašome, įvyko klaida išsaugant sąskaitos (${updateAccount.old.name} ${updateAccount.old.surname}) pakeitimus` });
          return;
        }
        setMessage({ type: "error", text: `Atsiprašome, įvyko klaida išsaugant sąskaitos (${updateAccount.old.name} ${updateAccount.old.surname}) pakeitimus` });
      });
  }, [updateAccount]);

  useEffect(() => {
    if (deleteDocument === null) {
      return;
    }
    axios
      .delete(documentsUrl + "/" + deleteDocument.id + "/" + deleteDocument.accountId, { withCredentials: true })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setAccounts((accounts) => accounts.map((account) => (account.documentId === Number(res.data.id) ? { ...account, documentId: null } : { ...account })));
        setChanged(Date.now());
        setMessage({ type: "success", text: `Dokumentas ištrintas` });
      })
      .catch((e) => {
        const res = e.response;
        if (res.status === 401) {
          setMessage({ type: "error", text: `Esate neprisijungęs. Atsiprašome, įvyko klaida panaikinant dokumentą` });
          return;
        }
        setMessage({ type: "error", text: `Atsiprašome, įvyko klaida panaikinant dokumentą` });
      });
  }, [deleteDocument]);

  return [message, accounts, setAccounts, setNewAccount, setDeleteAccount, setUpdateAccount, changed, payTax, setDeleteDocument, modifyOneAccount];
}

export default useAccounts;
