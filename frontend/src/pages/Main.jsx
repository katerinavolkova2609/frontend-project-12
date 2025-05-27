import React, { useEffect, useState } from 'react';
import { getChannels, getMessages, sendMessage, removeMessage } from './api.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice.js';
import ChannelList from './components/ChannelList.jsx';
import MessageForm from './components/MessageForm.jsx';

const Main = () => {
  const { user } = useSelector(selectCurrentUser);
  const { username, token } = user;

  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [selectedButton, setSelectedButton] = useState('1');
  const [newMessageBody, setNewMessageBody] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const channels = await getChannels(token);
          setChannels(channels);
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
          setMessages(messages);
          console.log(messages);
          // messages.map(async (item) => {
          //   await removeMessage(token, item.id);
          //   console.log('сообщение удалено');
          //   return;
          // });
        }
      } catch (e) {
        console.error('Ошибка при загрузке сообщений:', e);
      }
    };
    fetchData();
  }, [token]);

  const handleClick = (channel) => {
    setSelectedButton(channel.id);
    setSelectedChannel(channel.name);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageBody.trim()) return;
    const messagePayload = {
      body: newMessageBody,
      channelId: selectedButton,
      username: username,
    };
    try {
      await sendMessage(token, messagePayload);
      const updatedMessages = await getMessages(token);
      setMessages(updatedMessages);
      setNewMessageBody('');
    } catch (e) {
      console.error('Ошибка при отправке сообщения:', e);
    }
  };

  return (
    <div className="d-flex flex-column vh-100" id="chat">
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
              selectedChannelId={selectedButton}
              onSelect={handleClick}
            />
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {selectedChannel}</b>
                </p>
                <span className="text-muted">0 сообщений</span>
              </div>
              <div
                id="messages-box"
                className="chat-messages overflow-auto px-5 "
              >
                {messages.filter((item) => item.channelId === selectedButton)
                .map((message) => (
                    <div className="text-break mb-2">
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
