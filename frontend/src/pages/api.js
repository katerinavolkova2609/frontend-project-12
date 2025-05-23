import axios from 'axios';

const getChannels = async (token) => {
  try {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data); // => [{ id: '1', name: 'general', removable: false }, ...]
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении каналов:', error);
    throw error;
  }
};

const getMessages = async (token) => {
  try {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data); // => [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error);
    throw error;
  }
};

// const newMessage = { body: 'new message', channelId: '1', username: 'admin };
const sendMessage = async (token, newMessage) => {
  try {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data); // => [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};

export { getChannels, getMessages, sendMessage };
