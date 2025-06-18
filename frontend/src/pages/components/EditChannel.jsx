import { getChannelsFromState } from '../../store/channelsSlice.js'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import getSchema from '../utils/validationSchema.js'

const EditChannel = ({ onClose, token, channelId, onEdit }) => {
  const { t } = useTranslation()
  const successNotify = () => toast.success(t('notify.rename'))
  const warnNotify = () => toast.warn(t('notify.error'))

  const inputEl = useRef(null)
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus()
    }
  }, [])

  const channels = useSelector(getChannelsFromState)
  const [prevChannel] = channels.filter(channel => channel.id === channelId)
  const prevChannelName = prevChannel.name
  const namesOfChannels = channels.map(channel => channel.name)
  const formik = useFormik({
    initialValues: {
      channel: prevChannelName,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await onEdit(token, channelId, { name: values.channel })
        successNotify()
      }
      catch (e) {
        console.error(e)
        warnNotify()
      }
    },
    validationSchema: getSchema(namesOfChannels, t),
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="">
        <div>
          <input
            name="channel"
            required
            id="channel"
            className={`mb-2 form-control ${
              formik.errors.channel && formik.touched.channel
                ? 'is-invalid'
                : ''
            }`}
            onChange={formik.handleChange}
            value={formik.values.channel}
            onBlur={formik.handleBlur}
            ref={inputEl}
          />
          <label className="visually-hidden" htmlFor="channel">
            {t('nameOfChannel')}
          </label>
          {formik.errors.channel && formik.touched.channel
            ? (
                <div className="invalid-feedback">{formik.errors.channel}</div>
              )
            : null}
          <div className="invalid-feedback"></div>
          <div className="d-flex justify-content-end">
            <button
              onClick={onClose}
              type="button"
              className="me-2 btn btn-secondary"
            >
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('confirm')}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default EditChannel
