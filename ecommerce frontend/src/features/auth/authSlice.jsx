import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,loginUser ,signOut,checkAuth , resetPasswordRequest ,resetPassword } from './authAPI';

const initialState = {
    loggedInUserToken: null,
    status: 'idle',
    UserStatus: false,
    createError :null,
    loginError :null,
    requestError :null,
    resetPasswordError :null,
    mailSent:false,
    passwordResetStatus:false,
    };

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(userData,{rejectWithValue}) => {
      try{
        const response = await createUser(userData);
        return response.data;
      }
      catch(error){
        return rejectWithValue(error);
      }
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
        console.log("Error at loginUserAsync Slice:",error)
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
    async(email,{rejectWithValue}) => {
      try{
        const response = await resetPasswordRequest(email);
        return response.data;
      }
      catch(error){
        return rejectWithValue(error);
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
        const response = await signOut();
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
            state.createError =null,
            state.loginError =null,
            state.requestError =null,
            state.resetPasswordError =null
          })
          .addCase(createUserAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.createError = action.payload;
          })
          .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loginUserAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.loggedInUserToken = action.payload;
            state.createError =null,
            state.loginError =null,
            state.requestError =null,
            state.resetPasswordError =null
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
            state.status = 'loading';
            state.loginError = action.payload;
          })
          .addCase(signOutAsync.pending, (state) => {
            state.status = 'loading';
          }) 
          .addCase(signOutAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.error = null;
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
          .addCase(resetPasswordRequestAsync.pending, (state) => {
            state.status = 'loading';
            state.mailSent = false;
          }) 
          .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.mailSent = true;
            state.createError =null,
            state.loginError =null,
            state.requestError =null,
            state.resetPasswordError =null
          })
          .addCase(resetPasswordRequestAsync.rejected, (state,action) => {
            state.status = 'idle';
            state.mailSent = false;
            state.requestError = action.payload;
          })
          .addCase(resetPasswordAsync.pending, (state) => {
            state.status = 'loading';
            state.passwordResetStatus = false;
          }) 
          .addCase(resetPasswordAsync.fulfilled, (state) => {
            state.status = 'idle';
            state.passwordResetStatus = true;
            state.createError =null,
            state.loginError =null,
            state.requestError =null,
            state.resetPasswordError =null
          })
          .addCase(resetPasswordAsync.rejected, (state,action) => {
            state.status = 'idle';
            state.passwordResetStatus = false;
            state.resetPasswordError = action.payload;
          })
      },
    });

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectUserStatus = (state) => state.auth.UserStatus;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordResetStatus = (state) => state.auth.passwordResetStatus;
//errors handling
export const selectCreateError = (state) => state.auth.createError;
export const selectLoginError = (state) => state.auth.loginError;
export const selectRequestError = (state) => state.auth.requestError;
export const selectResetPasswordError = (state) => state.auth.resetPasswordError;
export default authSlice.reducer;
