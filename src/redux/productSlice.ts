import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  product: [] as Product[],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.product = [...action.payload]; 
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;