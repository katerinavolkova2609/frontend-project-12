import avatar from '../assets/avatar.jpg';
import Header from './components/Header';
import FormComponent from './components/AuthForm.jsx';
import { useTranslation } from 'react-i18next';

const Autorization = () => {
  const {t} = useTranslation();
  return (
    <div className="d-flex flex-column vh-100" id="chat">
      <Header />
      <div className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} alt="Войти" className="rounded-circle" />
                </div>
                <FormComponent />
              </div>
              <div className="card-footer p-4 text-center">
                <span>{t('noAccount')}</span>
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autorization;
