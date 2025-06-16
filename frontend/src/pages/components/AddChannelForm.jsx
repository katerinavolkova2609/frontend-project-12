import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { sendNewChannel, getChannels } from '../api'
import {
  setCurrentChannel,
  getChannelsFromState,
} from '../../store/channelsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import getSchema from '../utils/validationSchema'

const AddChannelForm = ({ onClose, token }) => {
  const dispatch = useDispatch()
  const channels = useSelector(getChannelsFromState)
  const { t } = useTranslation()
  const namesOfChannels = channels.map(channel => channel.name)
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  const notify = () => toast.success(t('notify.create'))

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async (values) => {
      try {
        await sendNewChannel(token, { name: values.channel })
        const channels = await getChannels(token)
        const currentChannel = channels.at(-1)
        dispatch(setCurrentChannel(currentChannel))
        notify()
        onClose()
      }
      catch (e) {
        console.error(e)
      }
    },
    validationSchema: getSchema(namesOfChannels, t),
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name="channel"
          id="channel"
          className={`mb-2 form-control  ${
            formik.errors.channel && formik.touched.channel ? 'is-invalid' : ''
          }`}
          required=""
          onChange={formik.handleChange}
          value={formik.values.channel}
          onBlur={formik.handleBlur}
          ref={inputEl}
        />
        <label className="visually-hidden" htmlFor="name">
          Имя канала
        </label>
        {formik.errors.channel && formik.touched.channel
          ? (
              <div className="invalid-feedback">{formik.errors.channel}</div>
            )
          : null}
        <div className="invalid-feedback"></div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={onClose}
          >
            {t('cancel')}
          </button>
          <button type="submit" className="btn btn-primary">
            {t('confirm')}
          </button>
        </div>
      </div>
    </form>
  )
}

AddChannelForm.propTypes = {
  onClose: PropTypes.bool.isRequired,
  token: PropTypes.number.isRequired,
}
export default AddChannelForm
