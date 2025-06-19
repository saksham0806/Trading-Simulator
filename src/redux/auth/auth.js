import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accesstoken: "asd"
  },
  reducers: {
    logout: (state) => {
      state.accesstoken = ""
    },
    loginUser: (state,action) =>{
      state.accesstoken = action.payload.accesstoken;
    }
  }
})

export const { loginUser, logout} = authSlice.actions

export default authSlice.reducer