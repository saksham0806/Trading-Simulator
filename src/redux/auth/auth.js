import { createSlice } from '@reduxjs/toolkit'

const getInitialToken = () => {
  return localStorage.getItem("accesstoken") || "";
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accesstoken: getInitialToken()
  },
  reducers: {
    logout: (state) => {
      state.accesstoken = "";
      window.localStorage.removeItem("accesstoken"); // Explicitly use window.localStorage
    },
    loginUser: (state, action) => {
      state.accesstoken = action.payload.accesstoken;
      localStorage.setItem("accesstoken", action.payload.accesstoken);
    }
  }
})

export const { loginUser, logout } = authSlice.actions

export default authSlice.reducer