import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import usersSlince from "../features/users/usersSlince"
import materielSlice from "../features/materiel/materiel"
import requestSlice from "../features/request/request"

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlince,
    materiel: materielSlice,
    request: requestSlice,
  },
})
export default store
