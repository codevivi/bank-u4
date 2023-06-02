import Modal from "../../Modal/Modal";

function ConfirmDeleteDocument({ close, account, handleDeleteDocument }) {
  return (
    <Modal close={close} title={"Ar tikrai norite ištrinti sąskaitos: " + account.name + " " + account.surname + " dokumentą?"}>
      <div className="confirm-delete">
        <button className="red" onClick={handleDeleteDocument}>
          Ištrinti Dokumentą
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteDocument;
