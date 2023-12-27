import { configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice.jsx';
import authReducer  from '../features/auth/authSlice.jsx';
import cartReducer from '../features/cart/cartSlice.jsx';


const store = configureStore({
        reducer:{
            product:productReducer,
            auth:authReducer,
            cart:cartReducer
        }
    })

export default store;