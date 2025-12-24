import { createPortal } from 'react-dom';

const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;
  return createPortal(
    <div className="modal" role="dialog" aria-modal>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <header className="modal__header">
          <h3>{title}</h3>
          <button className="modal__close" onClick={onClose} aria-label="Kapat">
            ×
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {actions && <footer className="modal__footer">{actions}</footer>}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
