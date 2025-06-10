import React from 'react';
import { toast } from 'react-toastify';
import { sendNewChannel, getChannels } from '../api';
import {
  setCurrentChannel,
  getChannelsFromState,
} from '../../store/channelsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRef, useEffect } from 'react';

const AddChannelForm = ({ onClose, token }) => {
  const dispatch = useDispatch();
  const channels = useSelector(getChannelsFromState);
  const namesOfChannels = channels.map((channel) => channel.name);

  const inputEl = useRef(null);

  useEffect(() => {
      inputEl.current.focus();
    }, []);

  const notify = () => toast.success('Канал создан');

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async (values) => {
      try {
        await sendNewChannel(token, { name: values.channel });
        const channels = await getChannels(token);
        const currentChannel = channels.at(-1);
        dispatch(setCurrentChannel(currentChannel));
        notify();
        onClose();
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
          ref={inputEl}
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
