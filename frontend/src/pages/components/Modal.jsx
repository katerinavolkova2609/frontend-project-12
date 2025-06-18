import { useTranslation } from 'react-i18next'
import AddChannelForm from './AddChannelForm'
import DeleteChannel from './DeleteChannel'
import EditChannel from './EditChannel'

const Modal = ({
  isOpen,
  onClose,
  type,
  token,
  onEdit,
  onRemove,
  channelId,
}) => {
  if (!isOpen) return null
  const { t } = useTranslation()

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
            <div className="modal-title h4">
              {type === 'delete'
                ? t('deleteChannel')
                : type === 'add'
                  ? t('addChannel')
                  : type === 'edit'
                    ? t('renameChannel')
                    : ''}
            </div>
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
            {type === 'add'
              ? (
                  <AddChannelForm onClose={onClose} token={token} />
                )
              : type === 'delete'
                ? (
                    <DeleteChannel
                      onClose={onClose}
                      onRemove={onRemove}
                      token={token}
                      channelId={channelId}
                    />
                  )
                : type === 'edit'
                  ? (
                      <EditChannel
                        onClose={onClose}
                        token={token}
                        channelId={channelId}
                        onEdit={onEdit}
                      />
                    )
                  : (
                      ''
                    )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
