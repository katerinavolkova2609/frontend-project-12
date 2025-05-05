import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload; // Устанавливаем данные пользователя
      state.loading = false; // Завершаем загрузку
      console.log(state.user)
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