import { useContext, useState } from "react";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import Modal from "../Modal/Modal";
import { GlobalContext } from "../../Contexts/GlobalCtx";
import idPlaceholder from "../../assets/images/id-placeholder.png";

export default function AddAccount({ setAddAccountModalOpen }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const { fileInput, inputFileForDisplay, readInputFile, removeInputFile } = useContext(GlobalContext);

  const { setNewAccount } = useContext(AccountsContext);

  function controlValidNameAndSurname(val) {
    val = val.replaceAll(/[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ\s]/g, "");
    //replace multiple spaces with one
    val = val.replaceAll(/ +/g, " ");
    val = val.split(" ");
    //make words start with uppercase
    val = val.map((word) => (word.length > 0 ? word[0]?.toUpperCase() + word.slice(1).toLowerCase() : "")).join(" ");
    return val;
  }

  function handleNameChange(e) {
    let name = e.target.value.trimStart();
    setName(controlValidNameAndSurname(name));
  }
  function handleSurnameChange(e) {
    let surname = e.target.value.trimStart();
    setSurname(controlValidNameAndSurname(surname));
  }
  function handleForm(e) {
    e.preventDefault();

    setName((name) => name.trim());
    setSurname((surname) => surname.trim());

    if (name && surname) {
      setNewAccount({ account: { name, surname, money: 0 }, document: fileInput?.current?.files[0] ? fileInput.current.files[0] : null });

      setName("");
      setSurname("");
      removeInputFile();
      setAddAccountModalOpen(false);
      return;
    }
  }
  function closeAndClear() {
    removeInputFile();
    setAddAccountModalOpen(false);
  }

  return (
    <Modal close={closeAndClear} title={"Sukurti naują sąskaitą"}>
      <form onSubmit={handleForm} className="add-account">
        <div>
          <label htmlFor="name">Vardas</label>
          <input id="name" autoFocus onChange={handleNameChange} required minLength={2} maxLength={30} name="name" value={name} type="text" />
        </div>
        <div>
          <label htmlFor="surname">Pavardė</label>
          <input id="surname" onChange={handleSurnameChange} required minLength={2} maxLength={30} name="surname" value={surname} type="text" />
        </div>
        <div>
          <label htmlFor="document">{inputFileForDisplay ? "Pakeisti" : "Įkelti dokumento kopiją jpeg formatu"}</label>
          <input className={!inputFileForDisplay ? "invisible" : ""} id="document" onChange={readInputFile} name="document" type="file" accept="image/jpeg" />
          {!inputFileForDisplay && <p>Failas nepasirinktas</p>}
          <div className="img-wrapper">
            {inputFileForDisplay && (
              <button type="button" onClick={removeInputFile} className="red remove-file-btn" aria-label="panaikinti documentą">
                &#x292C;
              </button>
            )}
            <img width={250} src={inputFileForDisplay ? inputFileForDisplay : idPlaceholder} alt="chosen document copy" />
          </div>
        </div>
        <button type="submit">Sukurti</button>
      </form>
    </Modal>
  );
}
