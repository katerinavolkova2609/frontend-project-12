import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {
    username: null,
    token: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null; // Очищаем данные пользователя
    },
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;