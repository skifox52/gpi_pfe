import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URI = "/materiel/all"
//Fetch all Materiel
export const fetchMateriel = createAsyncThunk(
  "materiel/getAllMateriel",
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

//Initial state
const initialState = {
  status: "idle", //pending, error, success,
  materiel: [],
  message: "",
}

const materielSlice = createSlice({
  name: "Materiel",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle"
      state.materiel = []
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMateriel.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchMateriel.rejected, (state, { payload }) => {
        state.status = "error"
        state.message = payload
        state.materiel = null
      })
      .addCase(fetchMateriel.fulfilled, (state, { payload }) => {
        state.status = "success"
        state.message = ""
        state.materiel = payload
      })
  },
})

export const { reset } = materielSlice.actions
export default materielSlice.reducer
