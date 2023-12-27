import './App.css'
import store from './app/store'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/Protected';

import { Provider ,useDispatch  ,useSelector} from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path :"/",
    element : <Protected> <Home /> </Protected>
  },
  {
    path:"/login",
    element : <LoginPage />
  },
  {
    path:"/signup",
    element : <SignupPage />
  },
  {
    path:"/cart",
    element:<Protected><CartPage /> </Protected>
  },
  {
    path:"/checkout",
    element:<Protected><CheckoutPage /> </Protected>
  },
  {
    path:"/product-detail/:id",
    element: <Protected><ProductDetailPage /> </Protected>
  }
])

function App() {
  
  
  return (
    <>
     <Provider store={store}>
       <RouterProvider router={router} >
       </RouterProvider>
     </Provider>
    </>
  )
}

export default App;