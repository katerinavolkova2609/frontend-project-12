import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import avatar from '../assets/404.svg'

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <div className="text-center">
        <img alt="Страница не найдена" style={{ width: '25%' }} src={avatar} />
        <h1 className="h4 text-muted">{t('error404')}</h1>
        <p className="text-muted">
          {t('checkUrl')}
          {' '}
          <a href="/">{t('onMainUrl')}</a>
        </p>
      </div>
    </div>
  )
}

export default NotFound
