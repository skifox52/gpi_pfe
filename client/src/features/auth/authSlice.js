import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const user = JSON.parse(localStorage.getItem("User"))
const API_URL = "/auth/login"

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

//Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", user)
    if (response.data) {
      localStorage.setItem("User", JSON.stringify(response.data))
    }
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await localStorage.removeItem('User')
})

//Create SLICE

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    //Reset the state
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.user = null
        state.message = payload
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      //Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isError = true
        state.isLoading = false
        state.user = null
        state.message = payload
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
