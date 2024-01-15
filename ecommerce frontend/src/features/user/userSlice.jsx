import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders ,updateUser,fetchLoggedInUser } from './userAPI';

const initialState = {
    status: 'idle',
    userInfo : null
    };

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async(userId) => {
        console.log(" user id at userSlice", userId)
        const response = await fetchLoggedInUserOrders(userId);
        return response.data;
    }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async() => {
        const response = await fetchLoggedInUser();
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async(userId) => {
        const response = await updateUser(userId);
        return response.data;
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
            state.userInfo.orders = action.payload;
        })
        .addCase(updateUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            console.log("action.payload at userSlice :", action.payload)
            state.userInfo = action.payload;
        })
        .addCase(fetchLoggedInUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userInfo = action.payload;
        })
    }
});

export const { increment } = userSlice.actions;
export const selectUserOrder = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
