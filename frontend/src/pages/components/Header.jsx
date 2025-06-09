import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={isAuthenticated ? '/' : '/login'}>
          Hexlet Chat
        </a>
        {isAuthenticated && (
          <button onClick={logOut} type="button" className="btn btn-primary">
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
