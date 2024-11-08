import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IFacility } from '@interfaces/facility.interface'

interface hotelState {
  facilities: IFacility[]
}
const initialState: hotelState = {
  facilities: []
}
const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    updateFacilities: (state, action: PayloadAction<{ id: string; sub: any }>) => {
      const { id, sub } = action.payload
      const currentFacility = state.facilities.find((el) => el.id === id)

      if (!currentFacility) {
        state.facilities.push({ id, subs: [sub] } as IFacility)
      } else {
        if (!currentFacility.subs) {
          currentFacility.subs = [sub]
        } else {
          if (!currentFacility.subs.includes(sub)) {
            currentFacility.subs.push(sub)
          }
        }
      }
    },
    removeFacilities: (state, action) => {
      const { id, sub } = action.payload
      const currentFacility = state.facilities.find((el) => el.id === id)

      if (currentFacility && currentFacility.subs) {
        currentFacility.subs = currentFacility.subs.filter((el) => el !== sub)

        if (currentFacility.subs.length === 0) {
          state.facilities = state.facilities.filter((el) => el.id !== id)
        }
      }
    },
    setDefaultFacilities: (state) => {
      state.facilities = []
    }
  }
})
export const { updateFacilities, removeFacilities, setDefaultFacilities } = hotelSlice.actions
export default hotelSlice.reducer
