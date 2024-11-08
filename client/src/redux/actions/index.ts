import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCurrent, apiGetRoles } from '@api/user'
import { apiGetAllDestination } from '@api/destination'
import { apiGetAllHotelTypes } from '@api/hotel'

export const getCurrentThunk = createAsyncThunk('user/current', async (_data, { rejectWithValue }) => {
  const response: any = await apiGetCurrent()
  if (!response.success) return rejectWithValue(response)
  return response
})
export const getRolesThunk = createAsyncThunk('app/roles', async (_data, { rejectWithValue }) => {
  const response: any = await apiGetRoles()
  if (!response.success) return rejectWithValue(response)
  return JSON.parse(atob(response.roles)) || []
})
export const getDestinationsThunk = createAsyncThunk('app/destinations', async (_data, { rejectWithValue }) => {
  const response: any = await apiGetAllDestination()
  if (!response.success) return rejectWithValue(response)
  return response.destinations || []
})
export const getHotelTypesThunk = createAsyncThunk('app/hotelTypes', async (_data, { rejectWithValue }) => {
  const response: any = await apiGetAllHotelTypes()
  if (!response.success) return rejectWithValue(response)
  return response.hotelTypes || []
})
