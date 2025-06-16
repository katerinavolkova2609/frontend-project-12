import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice.js';
import { useTranslation } from 'react-i18next';

const FormComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        if (Object.hasOwn(response.data, 'token')) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          dispatch(setUser({ user: response.data }));
          navigate('/');
        } else navigate('/login');
      } catch (e) {
        console.error(e);
        setErrorMessage(t('validation.errorAuth'));
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });
  return (
    <form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('enter')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required=""
          placeholder={t('login')}
          id="username"
          className={`form-control  ${
            (formik.errors.username && formik.touched.username) || errorMessage
              ? 'is-invalid'
              : ''
          }`}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username ? (
          <div className="text-danger">{formik.errors.username}</div>
        ) : null}
        <label htmlFor="username" className="form-label">
          {t('login')}
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required=""
          placeholder={t('password')}
          type="password"
          id="password"
          className={`form-control  ${
            (formik.errors.password && formik.touched.password) || errorMessage
              ? 'is-invalid'
              : ''
          }`}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
        <label className="form-label" htmlFor="password">
        {t('password')}
        </label>
        {errorMessage && <div className="invalid-tooltip">{errorMessage}</div>}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {t('enter')}
      </button>
    </form>
  );
};

export default FormComponent;
