import Modal from "../Modal/Modal";

function ConfirmLargeSumDeposit({ close, sum, account, handleConfirm }) {
  return (
    <Modal close={close} title={`Ar tikrai norite pridėti ${sum} į ${account.name} ${account.surname} sąskaitą?`}>
      <div className="confirm-large-sum">
        <button onClick={handleConfirm}>Taip</button>
      </div>
    </Modal>
  );
}

export default ConfirmLargeSumDeposit;
