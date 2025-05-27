import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice.js';

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/signup', values);
        if (response.data.hasOwnProperty('token')) {
          localStorage.setItem('token', response.data.token);
          dispatch(loginSuccess({ user: response.data }));
          navigate('/');
        }
      } catch (e) {
        console.error(e);
        setErrorMessage('Ошибка отправки данных');
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('обязательное поле'),
      password: Yup.string()
        .min(6, 'минимум 6 символов')
        .required('обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'пароли должны совпадать')
        .required('обязательное поле'),
    }),
  });
  return (
    <form class="w-50" onSubmit={formik.handleSubmit}>
      <h1 class="text-center mb-4">Регистрация</h1>
      <div class="form-floating mb-3">
        <input
          placeholder="От 3 до 20 символов"
          name="username"
          autocomplete="username"
          required=""
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
        <label class="form-label" for="username">
          Имя пользователя
        </label>
      </div>
      <div class="form-floating mb-3">
        <input
          placeholder="Не менее 6 символов"
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          autocomplete="new-password"
          type="password"
          id="password"
          class={`form-control  ${
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
        <label class="form-label" for="password">
          Пароль
        </label>
      </div>
      <div class="form-floating mb-4">
        <input
          placeholder="Пароли должны совпадать"
          name="confirmPassword"
          required=""
          autocomplete="new-password"
          type="password"
          id="confirmPassword"
          class={`form-control  ${
            (formik.errors.confirmPassword && formik.touched.confirmPassword) ||
            errorMessage
              ? 'is-invalid'
              : ''
          }`}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <div className="text-danger">{formik.errors.confirmPassword}</div>
        ) : null}
        <label class="form-label" for="confirmPassword">
          Подтвердите пароль
        </label>
        {errorMessage && <div className="invalid-tooltip">{errorMessage}</div>}
      </div>
      <button type="submit" class="w-100 btn btn-outline-primary">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default SignUpForm;
