import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {addToCart ,fetchItemsByUserId,updateCart,deleteItemFromCart,resetCart } from './cartAPI';

const initialState = {
    items: [],
    value: 0,
    status: 'idle',
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
    async(id) => {
        const response = await fetchItemsByUserId(id);
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
    async(userid) => {
        const response = await resetCart(userid);
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
            console.log("data at server :",action.payload)
            state.items.push(action.payload);
        })
        .addCase(fetchItemsByUserIdAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.items= action.payload;
        })
        .addCase(updateCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id);
            console.log("data at server :",index, ":",action.payload);
            state.items[index] = action.payload;
        })
        .addCase(deleteItemFromCartAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            const index = state.items.findIndex(item=>item.id===action.payload.id);
            console.log("state.items | Deleted : index :",state.items," ",index ,"  ", action.payload)
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
export default cartSlice.reducer;