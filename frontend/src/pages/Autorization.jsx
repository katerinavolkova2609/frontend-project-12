import avatar from '../assets/avatar.jpg';
import FormComponent from './components/form.jsx';

const Autorization = () => {
  return (
    <div>
      <div class="container-fluid h-100">
        <div class="row justify-content-center align-content-center h-100">
          <div class="col-12 col-md-8 col-xxl-6">
            <div class="card shadow-sm">
              <div class="card-body row p-5">
                <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={avatar}
                    class="rounded-circle"
                    alt="Войти"
                  />
                </div>
                <FormComponent />
              </div>
              <div class="card-footer p-4">
                <div class="text-center">
                  <span>Нет аккаунта?</span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Autorization };
