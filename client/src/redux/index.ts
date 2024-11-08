import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import userSlice from './slices/user.slice'
import appSlice from './slices/app.slice'
import hotelSlice from './slices/hotel.slice'

const commonConfig = {
  key: 'tour/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['token', 'current']
}

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userSlice)!,
    app: appSlice,
    hotel: hotelSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
