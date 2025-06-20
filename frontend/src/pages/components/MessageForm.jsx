import { useTranslation } from 'react-i18next'

const MessageForm = ({ messageBody, onChange, onSend }) => {
  const { t } = useTranslation()
  return (
    <form noValidate className="py-1 border rounded-2" onSubmit={onSend}>
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label={t('newMessage')}
          placeholder={t('enterMessage')}
          className="border-0 p-0 ps-2 form-control"
          value={messageBody}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type="submit"
          disabled={!messageBody.trim()}
          className="btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            >
            </path>
          </svg>
          <span className="visually-hidden">{t('confirm')}</span>
        </button>
      </div>
    </form>
  )
}

export default MessageForm
