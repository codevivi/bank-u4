import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { SERVER_BASE_PATH } from "../../utils/config";
import Modal from "../Modal/Modal";
import { GlobalContext } from "../../Contexts/GlobalCtx";

const url = SERVER_BASE_PATH + "/documents";

export default function EditDocument({ close, account, updateImg }) {
  const documentFile = useRef();
  const [editDocument, setEditDocument] = useState(null);
  const { modifyOneAccount } = useContext(AccountsContext);
  const { addMsg } = useContext(GlobalContext);

  useEffect(() => {
    if (editDocument === null) {
      return;
    }
    const formData = new FormData();
    formData.append("accountId", editDocument.accountId);
    formData.append("document", editDocument.file);
    formData.append("id", editDocument.id);
    axios
      .put(url + "/" + editDocument.id, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        updateImg();
        addMsg({ type: "success", text: `Dokumentas pakeistas.` });
        close();
      })
      .catch((e) => {
        console.log(e);
        addMsg({ type: "error", text: `Atsiprašome, įvyko serverio klaida keičiant dokumentą` });
        close();
      });
  }, [editDocument, addMsg, modifyOneAccount, updateImg, close]);

  function handleForm(e) {
    e.preventDefault();
    setEditDocument({ accountId: account.id, file: documentFile.current.files[0], id: account.documentId });
    return;
  }

  return (
    <Modal close={close} title={"Keisti dokumentą"}>
      <form onSubmit={handleForm} className="add-account">
        <div>
          <label htmlFor="document">Įkelti dokumento kopiją jpeg formatu</label>
          <input id="document" ref={documentFile} name="document" type="file" accept="image/jpeg" />
        </div>
        <button>Keisti</button>
      </form>
    </Modal>
  );
}
