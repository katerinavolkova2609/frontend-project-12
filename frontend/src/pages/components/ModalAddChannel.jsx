import React from 'react';

const ModalAddChannel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
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
              <form className="">
                <div>
                  <input
                    name="name"
                    id="name"
                    className="mb-2 form-control"
                    value=""
                  />
                  <label className="visually-hidden" for="name">
                    Имя канала
                  </label>
                  <div className="invalid-feedback"></div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={onClose}
                    >
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Отправить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ModalAddChannel;
