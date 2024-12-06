// import { configureStore } from '@reduxjs/toolkit';
// import { counterSlice } from './counterSlice'; 
// import { authSlice } from './authSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//     auth: authSlice.reducer
//   },
// });


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'


const persistConfig = {
  key: 'root',
  storage,
}


const persistedAuthReducer = persistReducer(persistConfig, authReducer)


const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
})


const persistor = persistStore(store)

export { store, persistor }
