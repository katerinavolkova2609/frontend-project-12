import axios from 'axios'

const getChannels = async (token) => {
  try {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  catch (error) {
    console.error('Ошибка при получении каналов:', error)
    throw error
  }
}

const getMessages = async (token) => {
  try {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  catch (error) {
    console.error('Ошибка при загрузке сообщений:', error)
    throw error
  }
}

const sendMessage = async (token, newMessage) => {
  try {
    const response = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }
  catch (error) {
    console.error('Ошибка при отправке сообщения:', error)
    throw error
  }
}

const removeMessage = async (token, id) => {
  try {
    await axios.delete(`/api/v1/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (error) {
    console.error('Ошибка при удалении сообщения:', error)
    throw error
  }
}

const sendNewChannel = async (token, newChannel) => {
  try {
    await axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (error) {
    console.error('Ошибка при создании нового канала:', error)
    throw error
  }
}
const removeChannel = async (token, id) => {
  try {
    await axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (error) {
    console.error('Ошибка при удалении канала:', error)
    throw error
  }
}

// const editedChannel = { name: 'new name channel' };
const editChannel = async (token, channelId, editedChannel) => {
  try {
    await axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  catch (error) {
    console.error('Ошибка при переименовании канала:', error)
    throw error
  }
}

export {
  getChannels,
  getMessages,
  sendMessage,
  removeMessage,
  sendNewChannel,
  removeChannel,
  editChannel,
}
