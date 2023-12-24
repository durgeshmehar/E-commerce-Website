import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice.jsx';


const store = configureStore({
        reducer:{
            counter:counterReducer,
            // productList:productListReducer
        }
    })

export default store;