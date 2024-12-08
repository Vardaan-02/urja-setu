import { createSlice } from '@reduxjs/toolkit'
import { Event } from '@/types/event';
import { toggleLikeProduct } from '@/api/products/toggleLikeProduct';

export type UserRole = 'User' | 'DeliveryPerson' | 'Organization';

export interface UserDetails {
    address: string;
    cart: string;
    events: Event[],
    following: string[],
    liked: string[],
    orders: string[],
    phone: string | null;
    wallet: number,
}

export interface DeliveryPersonDetails {
    address: string;
    assignedWork: string[];
    rating: number;
    organizationId: string;
    phone: string | null;
    orders: string[];
}

export interface OrganizationDetails {
    address: string;
    events: [];
    phone: string | null;
    followers: string[];
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
    details: Partial<UserDetails & DeliveryPersonDetails & OrganizationDetails> ;
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

    updateLikedProducts: (state, action) => {
        const { userId, productId, isLiked } = action.payload;
        if(state.details.liked){
            if(isLiked){
                state.details.liked = state.details.liked.filter(
                    (id: string) => id !== productId
                );
            }
            else{
                state.details.liked.push(productId);
            }
            toggleLikeProduct(productId, userId);
            // state.details.liked = [productId];
        }
    },

    setUserEvents: (state, action) => {
        const events = action.payload;
        state.details.events = events;
    },

    resetAuth: () => initialState,
  },
})

export const {setAuthData, resetAuth, updateDetails, updateRole, updateOrders, updateLikedProducts, setUserEvents} = authSlice.actions

export default authSlice.reducer