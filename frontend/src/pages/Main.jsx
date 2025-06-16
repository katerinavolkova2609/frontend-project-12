import React from 'react';
import { useEffect, useState } from 'react';
import {
  getChannels,
  getMessages,
  sendMessage,
  removeChannel,
  editChannel,
} from './api.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessages,
  addMessage,
  getMessagesFromState,
  removeMessageFromState,
} from '../store/messagesSlice.js';
import {
  getChannelsFromState,
  getCurrentChannel,
  setChannels,
  addChannel,
  setCurrentChannel,
  removeChannelFromState,
  renameChannel,
} from '../store/channelsSlice.js';
import Header from './components/Header.jsx';
import ChannelList from './components/ChannelList.jsx';
import MessaageList from './components/MessageList.jsx';
import MessageForm from './components/MessageForm.jsx';
import ModalAddChannel from './components/ModalAddChannel.jsx';
import ModalDeleteChannel from './components/ModalDeleteChannel.jsx';
import ModalEditChannel from './components/ModalEditChannel.jsx';
import defaultChannel from './utils/defaultChannel.js';
import socket from './socket.js';
import { useTranslation } from 'react-i18next';
import { clean, getDictionary, add } from 'leo-profanity';

const Main = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [newMessageBody, setNewMessageBody] = useState('');
  const [isModalAddChannelOpen, setModalAddChannelOpen] = useState(false);
  const [isModalDeleteChannelOpen, setModalDeleteChannelOpen] = useState(false);
  const [isModalEditChannelOpen, setModalEditChannelOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  add(getDictionary('ru'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const channels = await getChannels(token);
          dispatch(setChannels(channels));
        }
      } catch (e) {
        console.error('Ошибка при загрузке каналов:', e);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const messages = await getMessages(token);
          console.log(messages);
          dispatch(setMessages(messages));
        }
      } catch (e) {
        console.error('Ошибка при загрузке сообщений:', e);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    socket.connect();

    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload));
    };
    const handleAddMessage = (payload) => {
      dispatch(addMessage(payload));
    };
    const handleRemoveChannel = (payload) => {
      console.log(payload);
      dispatch(removeChannelFromState(payload.id));
    };
    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload));
    };
    socket.on('newMessage', handleAddMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleAddMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.disconnect();
    };
  }, []);

  const handleClick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  const currentChannel = useSelector(getCurrentChannel);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageBody.trim()) return;
    const messagePayload = {
      body: newMessageBody,
      channelId: currentChannel.id,
      username: username,
    };
    try {
      await sendMessage(token, messagePayload);
      const updatedMessages = await getMessages(token);
      dispatch(setMessages(updatedMessages));
      setNewMessageBody('');
    } catch (e) {
      console.error('Ошибка при отправке сообщения:', e);
    }
  };
  const messages = useSelector(getMessagesFromState);

  const openModalAddChannel = () => setModalAddChannelOpen(true);
  const closeModalAddChannel = () => setModalAddChannelOpen(false);

  const openModalDeleteChannel = (channelId) => {
    setModalDeleteChannelOpen(true);
    setSelectedChannelId(channelId);
  };

  const closeModalDeleteChannel = () => {
    setModalDeleteChannelOpen(false);
    setSelectedChannelId(null);
  };

  const openModalEditChannel = (channelId) => {
    setModalEditChannelOpen(true);
    setSelectedChannelId(channelId);
  };

  const closeModalEditChannel = () => {
    setModalEditChannelOpen(false);
    setSelectedChannelId(null);
  };

  const handleRemoveChannel = async (token, channelId) => {
    dispatch(removeChannelFromState(channelId));
    await removeChannel(token, channelId);
    const channels = await getChannels(token);
    dispatch(setChannels(channels));

    dispatch(removeMessageFromState(channelId));
    closeModalDeleteChannel();
    if (currentChannel.id === channelId) {
      handleClick(defaultChannel);
    }
  };

  const handleEditChannel = async (token, channelId, editedChannel) => {
    await editChannel(token, channelId, editedChannel);
    const channels = await getChannels(token);
    dispatch(setChannels(channels));
    closeModalEditChannel();
  };
  const channels = useSelector(getChannelsFromState);
  const messageCounter = messages.filter(
    (item) => item.channelId === currentChannel.id
  ).length;

  return (
    <div className="d-flex flex-column vh-100" id="chat">
      <ModalAddChannel
        isOpen={isModalAddChannelOpen}
        onClose={closeModalAddChannel}
        token={token}
      />
      <ModalDeleteChannel
        isOpen={isModalDeleteChannelOpen}
        onClose={closeModalDeleteChannel}
        onRemove={handleRemoveChannel}
        token={token}
        channelId={selectedChannelId}
      />
      <ModalEditChannel
        isOpen={isModalEditChannelOpen}
        onClose={closeModalEditChannel}
        onEdit={handleEditChannel}
        token={token}
        channelId={selectedChannelId}
      />
      {isModalAddChannelOpen ||
        isModalDeleteChannelOpen ||
        (isModalEditChannelOpen && (
          <div className="fade modal-backdrop show" />
        ))}
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={openModalAddChannel}
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
              onRemove={handleRemoveChannel}
              onEditChannel={handleEditChannel}
              openDeleteModal={openModalDeleteChannel}
              openEditModal={openModalEditChannel}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {clean(currentChannel.name)}</b>
                </p>
                <span className="text-muted">
                  {` `}
                  {t('messages', { count: messageCounter })}
                </span>
              </div>
              <MessaageList
                messages={messages}
                currentChannel={currentChannel}
              />
              <div className="mt-auto px-5 py-3">
                <MessageForm
                  messageBody={newMessageBody}
                  onChange={(text) => setNewMessageBody(text)}
                  onSend={handleSendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default Main;
