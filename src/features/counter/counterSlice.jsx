import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddress } from './userAPI';

const initialState = {
    userInfo: null,
    status: 'idle',
    };

export const fetchAddressAsync = createAsyncThunk(
    'user/fetchAddress',
    async(userId) => {
        const response = await fetchAddress(userId);
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAddressAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAddressAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userInfo = action.payload;
        });
    }
});

export const { increment } = counterSlice.actions;
export const selectUserinfo = (state) => state.user.userInfo;
export default counterSlice.reducer;
