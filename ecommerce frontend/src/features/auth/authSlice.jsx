import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,loginUser ,signOut,checkAuth} from './authAPI';

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    UserStatus: false,
    error:null,
    };

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);
export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async(loginInfo,{rejectWithValue}) => {
      try{
        const response = await loginUser(loginInfo);
        return response.data;
      }
      catch(error){
        return rejectWithValue(error);
      }
    }
);
export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
    async() => {
      try{
        const response = await checkAuth();
        return response.data;
      }
      catch(error){
        console.log("Error at checkAuthSlice",error)
      }
    }
);

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async() => {
        const response = await signOut();
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
            state.loggedInUserToken = action.payload;
          })
          .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loginUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUserToken = action.payload;
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
            state.status = 'loading';
            state.error = action.payload;
          })
          .addCase(signOutAsync.pending, (state) => {
            state.status = 'loading';
          }) // Fix: Add an empty arrow function as the second argument
          .addCase(signOutAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.loggedInUserToken = null;
          })
          .addCase(checkAuthAsync.pending, (state) => {
            state.status = 'loading';
            state.UserStatus = false;
          }) 
          .addCase(checkAuthAsync.fulfilled, (state,action) => {
            state.status = 'idle';
            state.loggedInUserToken = action.payload;
            state.UserStatus = true;
          })
          .addCase(checkAuthAsync.rejected, (state) => {
            state.status = 'idle';
            state.UserStatus = true;
          })
      },
    });

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserStatus = (state) => state.auth.UserStatus;
export default authSlice.reducer;
