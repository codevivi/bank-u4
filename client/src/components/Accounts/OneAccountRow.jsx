import CurrencyInput from "react-currency-input-field";
import { useContext, useState } from "react";
import formatCurrency from "../../utils/formatCurrency";
import { GlobalContext } from "../../Contexts/GlobalCtx";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import ConfirmDelete from "./ConfirmDelete";
import idPlaceholder from "../../assets/images/id-placeholder.png";
import ConfirmDeleteDocument from "./ConfirmDeleteDocument";
import AddDocument from "./AddDocument";

export default function OneAccountRow({ account }) {
  const [newAmount, setNewAmount] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [confirmDeleteDocumentModalOpen, setConfirmDocumentDeleteModalOpen] = useState(false);
  const [addDocumentModalOpen, setAddDocumentModalOpen] = useState(false);
  const { addMsg } = useContext(GlobalContext);
  const { setUpdateAccount, setDeleteAccount, setDeleteDocument } = useContext(AccountsContext);

  const toggleDeleteDocumentModal = () => setConfirmDocumentDeleteModalOpen((openState) => !openState);
  const toggleDeleteAccountModal = () => setConfirmDeleteModalOpen((openState) => !openState);
  const toggleAddDocumentModal = () => setAddDocumentModalOpen((openState) => !openState);

  const changeAmount = (value) => {
    if (value) {
      if (Number(value) > 1000000000000) {
        setNewAmount((1000000000000).toString());
        return;
      }
      setNewAmount(value);
      return;
    }
    setNewAmount(null);
  };

  const addMoneyToAccount = () => {
    if (newAmount !== null) {
      setUpdateAccount({ old: { ...account }, changed: { money: Number(account.money) + Number(newAmount) } });
      addMsg({ type: "success", text: `${formatCurrency(newAmount)} pridėta į sąskaitą (${account.name} ${account.surname}).` });
    }
    setNewAmount(null);
  };

  const subtractMoneyFromAccount = () => {
    if (newAmount !== null) {
      if (Number(account.money) - Number(newAmount) < 0) {
        addMsg({ type: "error", text: "Pervedimas nepavyko: saskaitoje neužtenka pinigų." });
        return;
      }
      setUpdateAccount({ old: { ...account }, changed: { money: Number(account.money) - Number(newAmount) } });
      addMsg({ type: "success", text: `${formatCurrency(newAmount)} nuskaičiuota iš (${account.name} ${account.surname}).` });
    }

    setNewAmount(null);
  };

  const handleDelete = () => {
    if (Number(account.money) > 0) {
      addMsg({ type: "error", text: "Sąskaitos kurioje yra pinigų ištrinti negalima." });
      return;
    }
    setDeleteAccount(account);
    addMsg({ type: "success", text: `Kliento (${account.surname} ${account.name}) sąskaita sėkmingai panaikinta.` });
    setConfirmDeleteModalOpen(false);
  };

  const handleBlock = () => {
    addMsg({ type: "success", text: `Kliento (${account.surname} ${account.name}) sąskaita ${account.blocked ? "atblokuota" : "užblokuota"}.` });
    setUpdateAccount({ old: { ...account }, changed: { blocked: !account.blocked } });
  };
  const handleDeleteDocument = () => {
    setDeleteDocument({ id: account.documentId, accountId: account.id });
    setConfirmDocumentDeleteModalOpen(false);
  };

  return (
    <li className="account">
      <div className="row">
        <div className="field">
          <h2>Pavardė: </h2>
          <p> {account.surname}</p>
        </div>
        <div className="field">
          <h2>Vardas: </h2>
          <p> {account.name}</p>
        </div>
        <div className="field">
          <h2>Suma: </h2>
          <p>{formatCurrency(Number(account.money))}</p>
        </div>
      </div>

      <div className="row">
        <div className="field document">
          <h2>Dokumentas</h2>
          <img src={account.documentId ? "http://localhost:5000/api/documents/" + account.documentId : idPlaceholder} width={100} alt={account.documentId ? account.name + " " + account.surname + " dokumento kopija" : "dokumento kopijos nėra paveiksliukas"} />
          {!account.blocked && (
            <div className="controls-wrapper">
              {account.documentId && (
                <div className="control-box">
                  <button>Keisti</button>
                </div>
              )}
              {!account.documentId && (
                <div className="control-box">
                  <button onClick={toggleAddDocumentModal}>Pridėti</button>
                  {addDocumentModalOpen && <AddDocument close={toggleAddDocumentModal} account={account} />}
                </div>
              )}
              {account.documentId && (
                <div className="control-box">
                  <button onClick={toggleDeleteDocumentModal} className="red">
                    Ištrinti
                  </button>
                  {confirmDeleteDocumentModalOpen && <ConfirmDeleteDocument close={toggleDeleteDocumentModal} account={account} handleDeleteDocument={handleDeleteDocument} />}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="field money-actions">
          <h2>Lėšų valdymas</h2>
          {!account.blocked && (
            <div className="controls-wrapper">
              <div className="control-box">
                <CurrencyInput
                  className="currency-input"
                  id="amount"
                  placeholder="Įveskite sumą"
                  suffix=" &euro;"
                  decimalsLimit={2}
                  decimalSeparator="."
                  decimalScale={2}
                  allowDecimals={true}
                  name="amount"
                  allowNegativeValue={false}
                  groupSeparator=","
                  value={newAmount || ""}
                  onValueChange={(value) => changeAmount(value)}></CurrencyInput>
              </div>
              <div className="control-box">
                <button className={`green ${account.promiseId ? "disabled" : ""}`} onClick={addMoneyToAccount}>
                  {!newAmount && <span className="inline-msg">{account.promiseId ? "Wait..." : "Įrašykite sumą"}</span>}
                  pridėti lėšų
                </button>
              </div>
              <div className="control-box">
                <button className={`orange ${Number(account.money) < newAmount || account.promiseId ? "disabled" : ""}`} onClick={subtractMoneyFromAccount}>
                  {!newAmount && <span className="inline-msg">{account.promiseId ? "Wait..." : "Įrašykite sumą"}</span>}
                  {Number(account.money) < newAmount && <span className="inline-msg red">Negalima nuskaičiuoti daugiau nei yra sąskaitoje.</span>}
                  nuskaičiuoti lėšas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="field account-control">
          <h2>Sąskaitos valdymas</h2>

          <div className="controls-wrapper">
            <div className="control-box">
              <button onClick={handleBlock} className="orange">
                {account.blocked ? "Atblokuoti" : "Užblokuoti"}
              </button>
            </div>

            {!account.blocked && (
              <div className="control-box">
                <button className={`red ${Number(account.money) > 0 || account.promiseId ? "disabled" : ""}`} onClick={toggleDeleteAccountModal}>
                  {Number(account.money) > 0 && <span className="inline-msg red">Negalima ištrinti sąskaitos kurioje yra pinigų.</span>}
                  ištrinti
                </button>
                {confirmDeleteModalOpen && <ConfirmDelete close={toggleDeleteAccountModal} handleDelete={handleDelete} account={account} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
