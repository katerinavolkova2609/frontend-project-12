import { useEffect, useState } from 'react';
import {
  getChannels,
  getMessages,
  sendMessage,
  removeMessage,
  removeChannel,
} from './api.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessages,
  addMessage,
  getMessagesFromState,
  removeMessageFromState,
} from '../store/messagesSlice.js';
// import { selectCurrentUser, logout } from '../store/authSlice.js';
import {
  getChannelsFromState,
  getCurrentChannel,
  setChannels,
  addChannel,
  setCurrentChannel,
  removeChannelFromState,
} from '../store/channelsSlice.js';
import ChannelList from './components/ChannelList.jsx';
import MessageForm from './components/MessageForm.jsx';
import ModalAddChannel from './components/ModalAddChannel.jsx';
import socket from './socket.js';

const Main = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const dispatch = useDispatch();

  const [newMessageBody, setNewMessageBody] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

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
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    return () => {
      socket.off('newChannel');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on('removeChannel', (payload) => {
      console.log(payload);
      dispatch(removeChannelFromState(payload));
      dispatch(removeMessageFromState(payload.id));
    });
    return () => {
      socket.off('removeChannel');
      socket.disconnect();
    };
  }, []);

  const handleClick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };
  const defaultChannel = {
    id: '1',
    name: 'general',
    removable: false,
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

  const handleRemoveChannel = async (token, channelId) => {
    await removeChannel(token, channelId);
    const channels = await getChannels(token);
    dispatch(setChannels(channels));
    if (currentChannel.id === channelId) {
      handleClick({ defaultChannel });
    }
    //не забыть удалить сообщения (!!!!)
  };

  const messages = useSelector(getMessagesFromState);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="d-flex flex-column vh-100" id="chat">
      <ModalAddChannel
        isOpen={isModalOpen}
        onClose={closeModal}
        token={token}
      />
      {isModalOpen && <div className="fade modal-backdrop show" />}
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
          <button type="button" className="btn btn-primary">
            Выйти
          </button>
        </div>
      </nav>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
                onClick={openModal}
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
              channels={useSelector(getChannelsFromState)}
              selectedChannelId={currentChannel.id}
              onSelect={handleClick}
              token={token}
              onRemove={handleRemoveChannel}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {currentChannel.name}</b>
                </p>
                <span className="text-muted">
                  {
                    messages.filter(
                      (item) => item.channelId === currentChannel.id
                    ).length
                  }
                  сообщений
                </span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
              >
                {messages
                  .filter((item) => item.channelId === currentChannel.id)
                  .map((message) => (
                    <div key={message.id} className="text-break mb-2">
                      <b>{message.username}</b>
                      {': '}
                      {message.body}
                    </div>
                  ))}
              </div>
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
