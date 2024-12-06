import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    uid: string | null,
    name: string | null,
    email: string | null,
    photoURL: string | null,
    role: string | null,
    details: {},
}

const initialState: AuthState = {
    uid: null,
    name: null,
    email: null,
    photoURL: null,
    role: null,
    details: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
        const { uid, name, email, photoURL, role, details } = action.payload;
        state.uid = uid;
        state.name = name;
        state.email = email;
        state.photoURL = photoURL;
        state.role = role;
        state.details = details || {};
    },
    updateDetails: (state, action) => {
        const {updates}  = action.payload;
        state.details = { ...state.details, ...updates }; 
    },
    updateRole: (state, action) => {
        state.role = action.payload;
    },
    resetAuth: () => initialState,
  },
})

export const {setAuthData, resetAuth, updateDetails, updateRole} = authSlice.actions

export default authSlice.reducer