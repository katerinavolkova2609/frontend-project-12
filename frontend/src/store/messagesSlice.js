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
  },
});

export const getMessagesFromState = (state) => state.messages;
export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
