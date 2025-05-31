import { configureStore } from '@reduxjs/toolkit'
import authreducer from "./auth/auth"

export default configureStore({
  reducer: {
    auth:authreducer
  }
})