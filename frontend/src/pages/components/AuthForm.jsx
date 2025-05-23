import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice.js';

const FormComponent = () => {
  const [errorMessage, setErrorMessage] = useState('');
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
        if (response.data.hasOwnProperty('token')) {
          localStorage.setItem('token', response.data.token);
          dispatch(loginSuccess({ user: response.data }));
          navigate('/');
        }
      } catch (e) {
        console.error(e);
        setErrorMessage('Неверный логин или пароль');
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
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
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
          Ваш ник
        </label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
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
          Пароль
        </label>
        {errorMessage && <div className="invalid-tooltip">{errorMessage}</div>}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        Войти
      </button>
    </form>
  );
};

export default FormComponent;
