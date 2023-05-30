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
  const { modifyOneAccount } = useContext(AccountsContext);
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
        modifyOneAccount({ id: newDocument.accountId, documentId: res.data.id });
        addMsg({ type: "success", text: `Dokumentas pridėtas.` });
        close();
      })
      .catch((e) => {
        console.log(e);
        addMsg({ type: "error", text: `Atsiprašome, įvyko serverio klaida pridedant dokumentą` });
        close();
      });
  }, [newDocument, addMsg, modifyOneAccount, close]);

  function handleForm(e) {
    e.preventDefault();
    setNewDocument({ accountId: account.id, file: documentFile.current.files[0] });
    return;
  }

  return (
    <Modal close={close} title={"Pridėti dokumentą"}>
      <form onSubmit={handleForm} className="add-account">
        <div>
          <label htmlFor="document">Įkelti dokumento kopiją jpeg formatu</label>
          <input id="document" ref={documentFile} name="document" type="file" accept="image/jpeg" />
        </div>
        <button>Pridėti</button>
      </form>
    </Modal>
  );
}
