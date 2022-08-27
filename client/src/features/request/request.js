import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URI = "/request"
//Initial State
const initialState = {
  status: "idle", //error, success, pending
  request: [],
  message: "",
}

//Get Requests
export const fetchRequest = createAsyncThunk(
  "request/getAllRequests",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(API_URI, config)
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

//Post request
export const postRequest = createAsyncThunk(
  "request/postRequest",
  async (requestData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(
        "http://localhost:5000/request/add",
        requestData,
        config
      )
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle"
      state.request = []
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchRequest.rejected, (state, { payload }) => {
        state.message = payload
        state.status = "error"
        state.request = null
      })
      .addCase(fetchRequest.fulfilled, (state, { payload }) => {
        state.status = "success"
        state.request = payload
      })
      .addCase(postRequest.pending, (state) => {
        state.status = "pending"
      })
      .addCase(postRequest.rejected, (state, { payload }) => {
        state.message = payload
        state.status = "error"
        state.request = null
      })
      .addCase(postRequest.fulfilled, (state, { payload }) => {
        state.status = "success"
        state.request.push(payload)
      })
  },
})

export const { reset } = requestSlice.actions
export default requestSlice.reducer
