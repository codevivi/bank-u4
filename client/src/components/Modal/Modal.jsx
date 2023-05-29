import { MdClose } from "react-icons/md";

function Modal({ children, title = "", close }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <button className="close-btn" onClick={close}>
          <MdClose />
        </button>
        <h2>{title}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
