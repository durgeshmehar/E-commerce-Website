import { configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice.jsx';
import authReducer  from '../features/auth/authSlice.jsx';
import cartReducer from '../features/cart/cartSlice.jsx';
import orderReducer from "../features/order/orderSlice.jsx"
import userReducer from "../features/user/userSlice.jsx"


const store = configureStore({
        reducer:{
            product:productReducer,
            auth:authReducer,
            cart:cartReducer,
            order:orderReducer,
            user: userReducer,
        }
    })

export default store;