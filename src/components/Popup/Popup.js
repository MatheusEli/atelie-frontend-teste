import closeIcon from "../../assets/close.svg";

function Popup({ message, onClose }) {
  return (
    <div className="modal">
      <div
        className={
          message.includes("Não foi possível realizar o cadastro")
            ? "modal__box modal-erro"
            : "modal__box"
        }
      ></div>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} />
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Popup;
