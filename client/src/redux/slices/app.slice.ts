import { IDestinationsSelect } from '@interfaces/destination.interface'
import { IHotelTypes } from '@interfaces/hotel.interface'
import { getDestinationsThunk, getHotelTypesThunk, getRolesThunk } from '@redux/actions'
import { createSlice } from '@reduxjs/toolkit'

interface IAppState {
  roles: any
  isLoading: boolean
  destinations: IDestinationsSelect[]
  isShowModal: boolean
  modalContent: string | React.ReactNode | null
  hotelTypes: IHotelTypes[]
  searchServices: {
    calendar: boolean
    personAndRoom: boolean
  }
}
const initialState: IAppState = {
  roles: [],
  isLoading: false,
  destinations: [],
  isShowModal: false,
  modalContent: null,
  hotelTypes: [],
  searchServices: {
    calendar: false,
    personAndRoom: false
  }
}
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload
    },
    toggleSearchService: (state, action) => {
      const { calendar, personAndRoom } = action.payload
      if (typeof calendar !== 'undefined') {
        state.searchServices.calendar = calendar
        state.searchServices.personAndRoom = false
      } else if (typeof personAndRoom !== 'undefined') {
        state.searchServices.personAndRoom = personAndRoom
        state.searchServices.calendar = false
      }
    },
    modal: (state, action) => {
      state.isShowModal = action.payload.isShowModal
      state.modalContent = action.payload.modalContent
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRolesThunk.fulfilled, (state, action) => {
        state.roles = action.payload
      })
      .addCase(getDestinationsThunk.fulfilled, (state, action) => {
        state.destinations = action.payload
      })
      .addCase(getHotelTypesThunk.fulfilled, (state, action) => {
        state.hotelTypes = action.payload
      })
  }
})
export const { toggleLoading, modal, toggleSearchService } = appSlice.actions
export default appSlice.reducer
