import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import usersSlince from "../features/users/usersSlince"

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlince,
  },
})
export default store
