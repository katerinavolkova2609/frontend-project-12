import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice.js';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          localStorage.setItem('username', response.data.username);
          dispatch(setUser({ user: response.data }));
          navigate('/');
        }
      } catch (e) {
        e.response.status === 409
          ? setErrorMessage(t('sameUser'))
          : setErrorMessage(t('errorPostData'));
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, t('validation.min_max'))
        .max(20, t('validation.min_max'))
        .required(t('validation.required')),
      password: Yup.string()
        .min(6, t('validation.min'))
        .required(t('validation.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('validation.matchPasswords'))
        .required(t('validation.required')),
    }),
  });
  return (
    <form class="w-50" onSubmit={formik.handleSubmit}>
      <h1 class="text-center mb-4">{t('registration')}</h1>
      <div class="form-floating mb-3">
        <input
          placeholder={t('validation.min_max')}
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
          onBlur={formik.handleBlur}
        />
        {formik.errors.username && formik.touched.username ? (
          <div placement="right" class="invalid-tooltip">
            {formik.errors.username}
          </div>
        ) : null}

        <label class="form-label" for="username">
          {t('username')}
        </label>
      </div>
      <div class="form-floating mb-3">
        <input
          placeholder={t('validation.min_max')}
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
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? (
          <div placement="right" class="invalid-tooltip">
            {formik.errors.password}
          </div>
        ) : null}
        <label class="form-label" for="password">
          {t('password')}
        </label>
      </div>
      <div class="form-floating mb-4">
        <input
          placeholder={t('matchPasswords')}
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
          onBlur={formik.handleBlur}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <div placement="right" class="invalid-tooltip">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
        <label class="form-label" for="confirmPassword">
          {t('confirmPassword')}
        </label>
        {errorMessage && <div className="invalid-tooltip">{errorMessage}</div>}
      </div>
      <button type="submit" class="w-100 btn btn-outline-primary">
        {t('toRegister')}
      </button>
    </form>
  );
};

export default SignUpForm;
