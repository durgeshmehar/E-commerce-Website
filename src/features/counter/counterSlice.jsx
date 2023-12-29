import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './userAPI';

const initialState = {
    userInfo: null,
    status: 'idle',
    };

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async(userId) => {
        const response = await fetchLoggedInUser(userId);
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
        .addCase(fetchLoggedInUserAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userInfo = action.payload;
        });
    }
});

export const { increment } = counterSlice.actions;
export const selectUserinfo = (state) => state.user.userInfo;
export default counterSlice.reducer;
