import { sendNewChannel, getChannels } from '../api';
import { getChannelsFromState } from '../../store/channelsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalEditChannel = ({
  isOpen,
  onClose,
  token,
  channelId,
  channelName,
  onEdit,
}) => {
  if (!isOpen) return null;

  const channels = useSelector(getChannelsFromState);
  const namesOfChannels = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      channel: '',
    },

    onSubmit: async (values) => {
      try {
        await onEdit(token, channelId, { name: values.channel });
        console.log(values);
      } catch (e) {
        console.error(e);
      }
    },
    validationSchema: Yup.object().shape({
      channel: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .notOneOf(namesOfChannels, 'Должно быть уникальным')
        .required('Введите название канала'),
    }),
  });
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
            <div className="modal-title h4">Переименовать канал</div>
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
                  id="channel"
                  className={`mb-2 form-control ${
                    formik.errors.channel && formik.touched.channel
                      ? 'is-invalid'
                      : ''
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.channel}
                  onBlur={formik.handleBlur}
                />
                <label className="visually-hidden" for="name">
                  Имя канала
                </label>
                {formik.errors.channel && formik.touched.channel ? (
                  <div class="invalid-feedback">{formik.errors.channel}</div>
                ) : null}
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={onClose}
                    type="button"
                    className="me-2 btn btn-secondary"
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
  );
};

export default ModalEditChannel;
