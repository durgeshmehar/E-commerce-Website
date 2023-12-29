import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
    userOrder: null,
    status: 'idle',
    };

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async(userId) => {
        console.log(" user id at userSlice", userId)
        const response = await fetchLoggedInUserOrders(userId);
        return response.data;
        console.log(" user data at userSlice", response.data)
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userOrder = action.payload;
        });
    }
});

export const { increment } = userSlice.actions;
export const selectUserOrder = (state) => state.user.userOrder;
export default userSlice.reducer;
