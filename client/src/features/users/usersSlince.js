import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//Fetch All Users

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const users = await axios.get("http://localhost:5000/users/all", config)
      return users.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

//InitialState
const initialState = {
  status: "idle", //"pendig, error, succeeded "
  users: [],
  message: "",
}
//CreateSlice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle"
      state.users = []
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    //Fetch all users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        state.status = "error"
        state.users = null
        state.message = payload
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = "succeeded"
        state.users = payload
      })
  },
})

export const { reset } = usersSlice.actions
export default usersSlice.reducer
