import React from 'react';
import AddChannelForm from './AddChannelForm.jsx';


const ModalAddChannel = ({ isOpen, onClose, token }) => {
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: 'block' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <AddChannelForm onClose={onClose} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddChannel;
