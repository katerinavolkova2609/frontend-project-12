import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={isAuthenticated ? '/' : '/login'}>
          {t('hexletChat')}
        </a>
        {isAuthenticated && (
          <button onClick={logOut} type="button" className="btn btn-primary">
            {t('quit')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
