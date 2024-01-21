import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,loginUser ,signOut,checkAuth , resetPasswordRequest ,resetPassword } from './authAPI';

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    UserStatus: false,
    error:null,
    mailSent:false,
    passwordResetStatus:false,
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
export const resetPasswordRequestAsync = createAsyncThunk(
    'user/resetPasswordRequest',
    async(email) => {
      try{
        const response = await resetPasswordRequest(email);
        return response.data;
      }
      catch(error){
        console.log("Error at resetPasswordRequestAsync",error)
      }
    }
);
export const resetPasswordAsync = createAsyncThunk(
    'user/resetPassword',
    async(data,{rejectWithValue}) => {
      try{
        const response = await resetPassword(data);
        return response.data;
      }
      catch(error){
        console.log("Error at resetPassword",error)
        return rejectWithValue(error);
      }
    }
);

export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async() => {
       console.log("signOutAsync")
        const response = await signOut();
        console.log("signOutAsync response: ",response)
        return response;
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
          }) 
          .addCase(signOutAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.loggedInUserToken = null;
            state.error = null;
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
          .addCase(resetPasswordRequestAsync.pending, (state) => {
            state.status = 'loading';
            state.mailSent = false;
          }) 
          .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.mailSent = true;
          })
          .addCase(resetPasswordAsync.pending, (state) => {
            state.status = 'loading';
            state.passwordResetStatus = false;
          }) 
          .addCase(resetPasswordAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.passwordResetStatus = true;
          })
          .addCase(resetPasswordAsync.rejected, (state,action) => {
            state.status = 'idle';
            console.log("resetPasswordAsync.rejected: ",action.payload)
            state.passwordResetStatus = false;
            state.error =action.payload;
          })
      },
    });

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserStatus = (state) => state.auth.UserStatus;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordResetStatus = (state) => state.auth.passwordResetStatus;
export default authSlice.reducer;
