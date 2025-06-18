import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ModalDeleteChannel = ({
  isOpen,
  onClose,
  onRemove,
  token,
  channelId,
}) => {
  if (!isOpen) return null
  const { t } = useTranslation()
  const successNotify = () => toast.success(t('notify.delete'))
  const warnNotify = () => toast.warn(t('notify.error'))

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: 'block' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title h4">{t('deleteChannel')}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            >
            </button>
          </div>
          <div className="modal-body">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDeleteChannel
