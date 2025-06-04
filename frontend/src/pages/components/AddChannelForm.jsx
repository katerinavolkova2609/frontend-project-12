import { sendNewChannel, getChannels } from '../api';
import { setCurrentChannel } from '../../store/channelsSlice.js';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddChannelForm = ({ onClose, token }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await sendNewChannel(token, { name: values.channel });
        const channels = await getChannels(token);
        const currentChannel = channels.at(-1);
        dispatch(setCurrentChannel(currentChannel));
        onClose();
      } catch (e) {
        console.error(e);
      }
    },
    validationSchema: Yup.object().shape({
      channel: Yup.string()
        .min(3, 'От 3 до 20 символов')
        .notOneOf([])
        .required('Введите название канала'),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name="channel"
          id="channel"
          class={`mb-2 form-control  ${
            formik.errors.channel && formik.touched.channel ? 'is-invalid' : ''
          }`}
          required=""
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
  );
};

export default AddChannelForm;
