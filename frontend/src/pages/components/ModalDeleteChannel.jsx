import React from 'react';
import { toast } from 'react-toastify';

const ModalDeleteChannel = ({
  isOpen,
  onClose,
  onRemove,
  token,
  channelId,
}) => {
  if (!isOpen) return null;
  const notify = () => toast.success('Канал удален');
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabindex="-1"
      style={{ display: 'block' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title h4">Удалить канал</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={onClose}
                className="me-2 btn btn-secondary"
              >
                Отменить
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await onRemove(token, channelId);
                    notify();
                  } catch (e) {
                    console.log(e);
                  }
                }}
                className="btn btn-danger"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteChannel;
