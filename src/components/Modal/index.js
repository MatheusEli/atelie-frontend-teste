import closeIcon from "../../assets/close.svg";

export default function Modal({ message, onClose }) {

  const handleBackdropClick = (e) => {
    if (!e.target.closest(".modal__box")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div
        className={
          message.includes("Não foi possível realizar o cadastro")
            ? "modal__box modal-erro"
            : "modal__box"
        }
      >
        <div className="modal__content">
          <button className="modal__close" onClick={onClose}>
            <img src={closeIcon} alt="Fechar modal" />
          </button>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
