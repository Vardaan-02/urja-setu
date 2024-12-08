import { Order } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface orderWithId extends Order{
  id: string | null;
}

const initialState = {
    order: [] as orderWithId[],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<orderWithId[]>) => {
        state.order = action.payload;
        console.log(state.order)
    },
  },
})

export const {setOrders} = orderSlice.actions

export default orderSlice.reducer