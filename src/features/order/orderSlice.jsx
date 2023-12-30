import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,fetchAllOrders } from './orderAPI';


const initialState = {
    orders: [],
    status: 'idle',
    currentOrder:null,
    totalOrders:0,
    };

export const createOrderAsync = createAsyncThunk(
    'order/createOrder',
    async(order) => {
        const response = await createOrder(order);
        return response.data;
    }
);
export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async(pagination) => {
        const response = await fetchAllOrders(pagination);
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        resetOrder: (state) => {
            state.currentOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrderAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createOrderAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            console.log("order at server:",action.payload);
            state.orders.push(action.payload);
            state.currentOrder = action.payload;
        })
        .addCase(fetchAllOrdersAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.orders = action.payload.orders;
            state.totalOrders = action.payload.totalOrders;
        })
    }
});

export const { increment ,resetOrder} = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder= (state) => state.order.currentOrder;
export const selectTotalOrders = (state) => state.order.totalOrders;
export default orderSlice.reducer;
