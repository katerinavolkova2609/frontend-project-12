import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getChannels,
  getMessages,
  sendMessage,
  removeChannel,
  editChannel,
} from './api.js'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMessages,
  addMessage,
  getMessagesFromState,
  removeMessageFromState,
} from '../store/messagesSlice.js'
import {
  getChannelsFromState,
  getCurrentChannel,
  setChannels,
  addChannel,
  setCurrentChannel,
  removeChannelFromState,
  renameChannel,
} from '../store/channelsSlice.js'
import Header from './components/Header.jsx'
import Modal from './components/Modal.jsx'
import ChannelList from './components/ChannelList.jsx'
import MessageList from './components/MessageList.jsx'
import MessageForm from './components/MessageForm.jsx'
import defaultChannel from './utils/defaultChannel.js'
import socket from './socket.js'
import { useTranslation } from 'react-i18next'
import { clean, getDictionary, add } from 'leo-profanity'

const Main = () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [newMessageBody, setNewMessageBody] = useState('')
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    channelId: null,
  })

  add(getDictionary('ru'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const channels = await getChannels(token)
          dispatch(setChannels(channels))
        }
        else navigate('/login')
      }
      catch (e) {
        console.error('Ошибка при загрузке каналов:', e)
      }
    }
    fetchData()
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const messages = await getMessages(token)
          console.log(messages)
          dispatch(setMessages(messages))
        }
      }
      catch (e) {
        console.error('Ошибка при загрузке сообщений:', e)
      }
    }
    fetchData()
  }, [token])

  useEffect(() => {
    socket.connect()

    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload))
    }
    const handleAddMessage = (payload) => {
      dispatch(addMessage(payload))
    }
    const handleRemoveChannel = (payload) => {
      console.log(payload)
      dispatch(removeChannelFromState(payload.id))
    }
    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload))
    }
    socket.on('newMessage', handleAddMessage)
    socket.on('newChannel', handleNewChannel)
    socket.on('removeChannel', handleRemoveChannel)
    socket.on('renameChannel', handleRenameChannel)

    return () => {
      socket.off('newMessage', handleAddMessage)
      socket.off('newChannel', handleNewChannel)
      socket.off('removeChannel', handleRemoveChannel)
      socket.off('renameChannel', handleRenameChannel)
      socket.disconnect()
    }
  }, [])

  const handleClick = (channel) => {
    dispatch(setCurrentChannel(channel))
  }

  const currentChannel = useSelector(getCurrentChannel)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessageBody.trim()) return
    const messagePayload = {
      body: newMessageBody,
      channelId: currentChannel.id,
      username: username,
    }
    try {
      await sendMessage(token, messagePayload)
      const updatedMessages = await getMessages(token)
      dispatch(setMessages(updatedMessages))
      setNewMessageBody('')
    }
    catch (e) {
      console.error('Ошибка при отправке сообщения:', e)
    }
  }
  const messages = useSelector(getMessagesFromState)
  const channels = useSelector(getChannelsFromState)
  const messageCounter = messages.filter(
    item => item.channelId === currentChannel.id,
  ).length

  const openModal = (type, channelId = null) => {
    setModalConfig({ isOpen: true, type, channelId })
  }

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null, channelId: null })
  }

  const handleRemoveChannel = async (token, channelId) => {
    dispatch(removeChannelFromState(channelId))
    await removeChannel(token, channelId)
    const channels = await getChannels(token)
    dispatch(setChannels(channels))
    dispatch(removeMessageFromState(channelId))
    closeModal()
    if (currentChannel.id === channelId) {
      handleClick(defaultChannel)
    }
  }

  const handleEditChannel = async (token, channelId, editedChannel) => {
    await editChannel(token, channelId, editedChannel)
    const channels = await getChannels(token)
    dispatch(setChannels(channels))
    closeModal()
  }

  return (
    <div className="d-flex flex-column vh-100" id="chat">
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        token={token}
        onEdit={handleEditChannel}
        onRemove={handleRemoveChannel}
        channelId={modalConfig.channelId}
      />
      {modalConfig.isOpen && <div className="fade modal-backdrop show" />}
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={() => openModal('add')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ChannelList
              channels={channels}
              selectedChannelId={currentChannel.id}
              onSelect={handleClick}
              token={token}
              openRemove={channelId => openModal('delete', channelId)}
              openEdit={channelId => openModal('edit', channelId)}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {` ` + clean(currentChannel.name)}
                  </b>
                </p>
                <span className="text-muted">
                  {` `}
                  {t('messages', { count: messageCounter })}
                </span>
              </div>
              <MessageList
                messages={messages}
                currentChannel={currentChannel}
              />
              <div className="mt-auto px-5 py-3">
                <MessageForm
                  messageBody={newMessageBody}
                  onChange={text => setNewMessageBody(text)}
                  onSend={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  )
}

export default Main
