import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const DeleteChannel = ({ onClose, onRemove, token, channelId }) => {
  const { t } = useTranslation()
  const successNotify = () => toast.success(t('notify.delete'))
  const warnNotify = () => toast.warn(t('notify.error'))

  return (
    <>
      <p className="lead">{t('sure')}</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          onClick={onClose}
          className="me-2 btn btn-secondary"
        >
          {t('cancel')}
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await onRemove(token, channelId)
              successNotify()
            }
            catch (e) {
              console.error(e)
              warnNotify()
            }
          }}
          className="btn btn-danger"
        >
          {t('delete')}
        </button>
      </div>
    </>
  )
}

export default DeleteChannel
