import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {addToCart ,fetchItemsByUserId,updateCart,deleteItemFromCart,resetCart } from './cartAPI';

const initialState = {
    items: [],
    value: 0,
    status: 'idle',
    cartLoaded: false,
    };

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async(item) => {
        const response = await addToCart(item);
        return response.data;
    }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async() => {
        const response = await fetchItemsByUserId();
        return response.data;
    }
);
export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async(update) => {
        const response = await updateCart(update);
        return response.data;
    }
);
export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async(id) => {
        const response = await deleteItemFromCart(id);
        return response.data;
    }
);
export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async() => {
        const response = await resetCart();
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(addToCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addToCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items.push(action.payload);
        })
        .addCase(fetchItemsByUserIdAsync.pending, (state) => {
            state.status = 'loading';
            state.cartLoaded = false;
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items= action.payload;
            state.cartLoaded = true;
        })
        .addCase(fetchItemsByUserIdAsync.rejected, (state) => {
            state.status = 'idle';
            state.cartLoaded = false;
        })
        .addCase(updateCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id);
            state.items[index] = action.payload;
        })
        .addCase(deleteItemFromCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id);
            state.items.splice(index,1);
        })
        .addCase(resetCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(resetCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items = [];
        })
    }
});

export const { increment } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const totalItems = (state) => state.cart.totalItems;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export default cartSlice.reducer;
