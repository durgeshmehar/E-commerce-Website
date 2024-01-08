import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser ,signOut} from './authAPI';

const initialState = {
    loggedInUser: null,
    status: 'idle',
    error:null,
    };

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);
export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async(loginInfo,{rejectWithValue}) => {
      try{
        const response = await checkUser(loginInfo);
        return response.data;
      }
      catch(error){
        return rejectWithValue(error);
      }
    }
);
export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async(userId) => {
        const response = await signOut(userId);
        return response.data;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(createUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
          .addCase(checkUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(checkUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUser = action.payload;
          })
          .addCase(checkUserAsync.rejected, (state, action) => {
            state.status = 'loading';
            state.error = action.payload;
          })
          .addCase(signOutAsync.pending, (state) => {
            state.status = 'loading';
          }) // Fix: Add an empty arrow function as the second argument
          .addCase(signOutAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.loggedInUser = null;
          })
      },
    });

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
