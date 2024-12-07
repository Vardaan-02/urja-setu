import { createSlice } from '@reduxjs/toolkit'

export type UserRole = 'User' | 'DeliveryPerson' | 'Organization';

export interface UserDetails {
    permissions: string[];
    department: string;
}

export interface DeliveryPersonDetails {
    shopName: string;
    products: any[];
    revenue: number;
}

export interface OrganizationDetails {
    orders: any[];
    wishlist: any[];
}

export type userDetails = 
    | { role: 'User'; details: UserDetails }
    | { role: 'DeliveryPerson'; details: DeliveryPersonDetails }
    | { role: 'Organization'; details: OrganizationDetails };

export interface AuthState {
    uid: string | null;
    name: string | null;
    email: string | null;
    photoURL: string | null;
    role: UserRole | null;
    details: Partial<UserDetails & DeliveryPersonDetails & OrganizationDetails>;
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
    updateOrders: (state, action) => {
        state.details.orders = action.payload;
    },
    resetAuth: () => initialState,
  },
})

export const {setAuthData, resetAuth, updateDetails, updateRole, updateOrders} = authSlice.actions

export default authSlice.reducer