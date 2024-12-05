import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counterSlice'; 

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { counter: CounterState }
export type AppDispatch = typeof store.dispatch;
