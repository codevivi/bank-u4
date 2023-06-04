import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AccountsContext } from "../../../Contexts/AccountsCtx";
import { SERVER_BASE_PATH } from "../../../utils/config";
import Modal from "../../Modal/Modal";
import { GlobalContext } from "../../../Contexts/GlobalCtx";
import idPlaceholder from "../../../assets/images/id-placeholder.png";

const url = SERVER_BASE_PATH + "/documents";
export default function ChangeDocument({ close, account, updateImg, imgUpdateTime }) {
  const [newDocument, setNewDocument] = useState(null);
  const [editDocument, setEditDocument] = useState(null);
  const { setDeleteDocument, modifyOneAccount } = useContext(AccountsContext);
  const { addMsg } = useContext(GlobalContext);
  const { fileInput, inputFileForDisplay, readInputFile, removeInputFile } = useContext(GlobalContext);
  const [isKeepRealFile, setIsKeepRealFile] = useState(account.documentId ? true : false);

  const handleDeleteDocument = () => {
    setDeleteDocument({ id: account.documentId, accountId: account.id });
    removeInputFile();
  };
  const handleEditDocument = () => {
    setEditDocument({ accountId: account.id, file: fileInput.current.files[0], id: account.documentId });
    removeInputFile();
  };
  const handleAddDocument = () => {
    setNewDocument({ accountId: account.id, file: fileInput.current.files[0] });
    removeInputFile();
  };

  useEffect(() => {
    if (editDocument === null) {
      return;
    }
    const formData = new FormData();
    formData.append("accountId", editDocument.accountId);
    formData.append("document", editDocument.file);
    formData.append("id", editDocument.id);
    axios
      .put(url + "/" + editDocument.id + "/" + editDocument.accountId, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        if (res.data.type !== "success") {
          throw new Error(res.data.message || "unknown");
        }
        updateImg();
        addMsg({ type: "success", text: `Dokumentas pakeistas.` });
        close();
      })
      .catch((e) => {
        const res = e.response;
        if (res.status === 401) {
          addMsg({ type: "error", text: `Esate neprisijungęs. Atsiprašome, įvyko klaida keičiant dokumentą` });
        } else if (res.status === 403) {
          addMsg({ type: "error", text: `Sąskaita užblokuota. Atsiprašome, įvyko klaida keičiant dokumentą` });
        } else {
          addMsg({ type: "error", text: `Atsiprašome, įvyko serverio klaida keičiant dokumentą` });
        }
        close();
      });
  }, [editDocument, addMsg, modifyOneAccount, updateImg, close]);

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
        const res = e.response;
        if (res.status === 401) {
          addMsg({ type: "error", text: `Esate neprisijungęs. Atsiprašome, įvyko klaida pridedant dokumentą` });
        } else if (res.status === 403) {
          addMsg({ type: "error", text: `Įvyko klaida pridedant dokumentą. Sąskaita užblokuota.` });
        } else {
          addMsg({ type: "error", text: `Atsiprašome, įvyko serverio klaida pridedant dokumentą` });
        }
        close();
      });
  }, [newDocument, addMsg, modifyOneAccount, close]);

  function handleForm(e) {
    e.preventDefault();
    if (!account.documentId && inputFileForDisplay) {
      return handleAddDocument();
    } else if (account.documentId && !isKeepRealFile && !inputFileForDisplay) {
      handleDeleteDocument();
    } else if (account.documentId && inputFileForDisplay) {
      return handleEditDocument();
    }
    return closeAndClear();
  }
  function closeAndClear() {
    removeInputFile();
    close();
  }

  return (
    <Modal close={closeAndClear} title={`${account.name} ${account.surname} dokumento kopija"`}>
      <form onSubmit={handleForm} className="add-account">
        <div>
          <label htmlFor="document">{!account.documentId && !inputFileForDisplay ? "Pridėti dokumento kopiją (jpeg)" : "Keisti dokumento kopiją (jpeg)"}</label>
          <input className={!inputFileForDisplay ? "invisible" : ""} id="document" onChange={readInputFile} name="document" type="file" accept="image/jpeg" />
          {!inputFileForDisplay && <p>Naujas Failas nepasirinktas</p>}

          <div className="img-wrapper">
            {/* {!inputFileForDisplay && <DocumentImg account={account} hash={imgUpdateTime} />} */}
            {!inputFileForDisplay && (
              <img src={isKeepRealFile ? "http://localhost:5000/api/documents/" + account.documentId + "/" + imgUpdateTime : idPlaceholder} width={100} alt={isKeepRealFile ? account.name + " " + account.surname + " dokumento kopija" : "dokumento kopijos nėra paveiksliukas"} />
            )}
            {isKeepRealFile && !inputFileForDisplay && (
              <button onClick={() => setIsKeepRealFile(false)} className="red remove-file-btn">
                &#x292C;
              </button>
            )}

            {inputFileForDisplay && (
              <>
                <button type="button" onClick={removeInputFile} className="red remove-file-btn" aria-label="panaikinti documentą">
                  &#x292C;
                </button>
                <img width={250} src={inputFileForDisplay ? inputFileForDisplay : idPlaceholder} alt="chosen document copy" />
              </>
            )}
          </div>
        </div>
        <button>Save</button>
      </form>
    </Modal>
  );
}
