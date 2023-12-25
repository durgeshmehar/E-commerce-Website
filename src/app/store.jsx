import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice.jsx';
import productReducer from '../features/product/productSlice.jsx';


const store = configureStore({
        reducer:{
            counter:counterReducer,
            product:productReducer,
        }
    })

export default store;