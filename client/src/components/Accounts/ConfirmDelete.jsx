import Modal from "../Modal/Modal";

function ConfirmDelete({ close, account, handleDelete }) {
  return (
    <Modal close={close} title={"Ar tikrai norite ištrinti sąskaitą: " + account.name + " " + account.surname + "?"}>
      <div className="confirm-delete">
        <button className="red" onClick={handleDelete}>
          Ištrinti
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDelete;
