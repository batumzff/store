import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import cartReducer from './features/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Hydration sorunlarını önlemek için wrapper component
export const createStore = () => {
  if (typeof window === 'undefined') {
    return store
  }
  return store
} 