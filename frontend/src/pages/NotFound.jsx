import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const {t} = useTranslation();
  return (
    <div>
      <h1>{t('error404')}</h1>
      <p>{t('checkUrl')}</p>
    </div>
  );
};

export default NotFound;
