import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../services/api'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

// localStorage'dan sepet verilerini aldığımız yer
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') return { items: [] }
  
  const savedCart = localStorage.getItem('cart')
  return savedCart ? JSON.parse(savedCart) : { items: [] }
}

const initialState: CartState = loadCartFromStorage()

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state))
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        localStorage.setItem('cart', JSON.stringify(state))
      }
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer 