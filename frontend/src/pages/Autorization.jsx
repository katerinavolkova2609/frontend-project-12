import avatar from '../assets/avatar.jpg';
import Header from './components/Header';
import FormComponent from './components/AuthForm.jsx';

const Autorization = () => {
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
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autorization;
