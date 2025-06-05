import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      state.push(action.payload);
    },
    removeMessageFromState(state, action) {
      state.messages.filter((message) => message.channelId !== action);
    }
  },
});

export const getMessagesFromState = (state) => state.messages;
export const { setMessages, addMessage, removeMessageFromState } = messagesSlice.actions;
export default messagesSlice.reducer;
