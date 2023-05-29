import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { SERVER_BASE_PATH } from "../../utils/config";
import Modal from "../Modal/Modal";
import { GlobalContext } from "../../Contexts/GlobalCtx";

const url = SERVER_BASE_PATH + "/documents";
export default function AddDocument({ close, account }) {
  const documentFile = useRef();
  const [newDocument, setNewDocument] = useState(null);
  const { setAccounts } = useContext(AccountsContext);
  const { addMsg } = useContext(GlobalContext);

  useEffect(() => {
    if (newDocument === null) {
      return;
    }
    const formData = new FormData();
    formData.append("accountId", newDocument.accountId);
    formData.append("document", newDocument.file);
    axios
      .post(url, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        setAccounts((accounts) => accounts.map((acc) => (acc.id === account.id ? { ...acc, documentId: res.data.id } : { ...acc })));
        addMsg({ type: "success", text: `Kliento (${account.name} ${account.surname}) dokumentas pridėtas.` });
      })
      .catch((e) => {
        console.log(e);
        addMsg({ type: "error", text: `Atsiprašome, įvyko serverio klaida pridedant dokumentą (${account.name} ${account.surname})` });
      });
  }, [newDocument]);

  function handleForm(e) {
    e.preventDefault();
    setNewDocument({ accountId: account.id, file: documentFile.current.files[0] });
    // close();
    return;
  }

  return (
    <Modal close={close} title={"Sukurti naują sąskaitą"}>
      <form onSubmit={handleForm} className="add-account">
        <div>
          <label htmlFor="document">Įkelti dokumento kopiją jpeg formatu</label>
          <input id="document" ref={documentFile} name="document" type="file" accept="image/jpeg" />
        </div>
        <button>Sukurti</button>
      </form>
    </Modal>
  );
}
