import React from 'react';
import { getChannelsFromState } from '../../store/channelsSlice.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import getSchema from '../utils/validationSchema';

const ModalEditChannel = ({ isOpen, onClose, token, channelId, onEdit }) => {
  if (!isOpen) return null;

  const { t } = useTranslation();
  const notify = () => toast.success(t('notify.rename'));

  const inputEl = useRef(null);
  useEffect(() => {
    if (isOpen && inputEl.current) {
      inputEl.current.focus();
    }
  }, [isOpen]);

  const channels = useSelector(getChannelsFromState);
  const [prevChannel] = channels.filter((channel) => channel.id === channelId);
  const prevChannelName = prevChannel.name;
  const namesOfChannels = channels.map((channel) => channel.name);
  const formik = useFormik({
    initialValues: {
      channel: prevChannelName,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await onEdit(token, channelId, { name: values.channel });
        notify();
      } catch (e) {
        console.error(e);
      }
    },
    validationSchema: getSchema(namesOfChannels, t),
  });
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
            <div className="modal-title h4">{t('renameChannel')}</div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit} className="">
              <div>
                <input
                  name="channel"
                  required
                  id="channel"
                  className={`mb-2 form-control ${
                    formik.errors.channel && formik.touched.channel
                      ? 'is-invalid'
                      : ''
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.channel}
                  onBlur={formik.handleBlur}
                  ref={inputEl}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('nameOfChannel')}
                </label>
                {formik.errors.channel && formik.touched.channel ? (
                  <div className="invalid-feedback">{formik.errors.channel}</div>
                ) : null}
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={onClose}
                    type="button"
                    className="me-2 btn btn-secondary"
                  >
                    {t('cancel')}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {t('confirm')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditChannel;
