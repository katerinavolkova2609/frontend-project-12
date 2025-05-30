import avatar from '../assets/avatar_Tota.jpg';
import SignUpForm from './components/SignUpForm';

const SignUp = () => {
  return (
    <div class="d-flex flex-column vh-100" id="signup">
      <nav class="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div class="container">
          <a class="navbar-brand" href="/login">
            Hexlet Chat
          </a>
          <button type="button" class="btn btn-primary">
            Выйти
          </button>
        </div>
      </nav>
      <div class="container-fluid h-100">
        <div class="row justify-content-center align-content-center h-100">
          <div class="col-12 col-md-8 col-xxl-6">
            <div class="card shadow-sm">
              <div class="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={avatar} class="rounded-circle" alt="Регистрация" />
                </div>
               <SignUpForm />
              </div>
            </div>
          </div>
          <div class="Toastify"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
