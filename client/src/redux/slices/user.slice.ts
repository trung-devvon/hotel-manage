import { ICurrentUser } from '@interfaces/user.interface'
import { getCurrentThunk } from '@redux/actions'
import { createSlice } from '@reduxjs/toolkit'


interface userState {
  current: null | ICurrentUser
  token: string | null
  isLoading: boolean
  message?: string | null
}
const initialState: userState = {
  current: null,
  token: null,
  isLoading: false,
  message: ''
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
    },
    logout: (state) => {
      state.token = null
      state.current = null
      state.message = ''
    },
    clearMessage: (state) => {
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentThunk.fulfilled, (state, action) => {
        state.current = action.payload.user
      })
      .addCase(getCurrentThunk.rejected, (state, action: any) => {
        state.token = null
        state.current = null
        state.message = ''
      })
  }
})
export const { login, clearMessage, logout } = userSlice.actions
export default userSlice.reducer
