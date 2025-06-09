import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  currentChannel: {
    id: '1',
    name: 'general',
    removable: false,
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.list = action.payload;
    },
    addChannel(state, action) {
      state.list.push(action.payload);
    },
    setCurrentChannel(state, action) {
      state.currentChannel = action.payload;
    },
    removeChannelFromState(state, action) {
      console.log(action);
      state.list = state.list.filter((channel) => channel.id !== action.payload);
    },
    renameChannel(state, action) {
      const channel = state.list.find((ch) => ch.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name;
        Object.assign(channel, action.payload);
      }
    }
  },
});

export const getChannelsFromState = (state) => state.channels.list;
export const getCurrentChannel = (state) => state.channels.currentChannel;
export const { setChannels, addChannel, setCurrentChannel, removeChannelFromState, renameChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
