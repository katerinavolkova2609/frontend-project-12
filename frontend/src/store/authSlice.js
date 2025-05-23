import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  isAuthenticated: false,
  user: {
    username: null,
    token: null,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      // state.user.username = action.payload.username; // Устанавливаем данные пользователя
      // state.user.token = action.payload.token;
      state.user = action.payload;
      state.loading = false; // Завершаем загрузку
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null; // Очищаем данные пользователя
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;