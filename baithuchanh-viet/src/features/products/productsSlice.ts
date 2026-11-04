import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'
import type { RootState } from '../../app/store'

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ProductsState {
  items: Product[]
  status: Status
  error: string | null
}

const initialState: ProductsState = { items: [], status: 'idle', error: null }

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) throw new Error(`Lỗi tải sản phẩm (${res.status})`)
    return (await res.json()) as Product[]
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Có lỗi xảy ra'
      })
  },
})

export const selectProducts = (s: RootState) => s.products.items
export const selectProductsStatus = (s: RootState) => s.products.status
export const selectProductsError = (s: RootState) => s.products.error

export default productsSlice.reducer
