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
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error);
    throw error;
  }
};

const sendMessage = async (token, newMessage) => {
  try {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    throw error;
  }
};

const removeMessage = async (token, id) => {
  try {
    axios.delete(`/api/v1/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Ошибка при удалении сообщения:', error);
    throw error;
  }
};

export { getChannels, getMessages, sendMessage, removeMessage };
