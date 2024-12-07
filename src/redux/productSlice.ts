import { Product, Review } from '@/types/product';
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
    setReviews: ( state, action: PayloadAction<{ productId: string, reviews: Review[] }>) => {
      const { productId, reviews } = action.payload;

      const productIndex = state.product.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        state.product[productIndex].reviews = reviews;
      }
    },
  },
});

export const { setProducts, setReviews } = productSlice.actions;

export default productSlice.reducer;