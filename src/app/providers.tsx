'use client'

import { Provider } from 'react-redux'
import { createStore } from '@/lib/store'

export function Providers({ children }: { children: React.ReactNode }) {
  const store = createStore()
  return <Provider store={store}>{children}</Provider>
} 