import Modal from "../Modal/Modal";

function ConfirmDelete({ close, account, handleDelete }) {
  return (
    <Modal close={close}>
      <div className="confirm-delete">
        <h2>
          Ar tikrai norite ištrinti sąskaitą: {account.name} {account.surname}?
        </h2>
        <button onClick={handleDelete}>Ištrinti</button>
      </div>
    </Modal>
  );
}

export default ConfirmDelete;
