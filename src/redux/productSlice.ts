import { Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {"product":Array<Product>}; 

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      
      state.product = [...action.payload]; 
      console.log(state.product); 
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
