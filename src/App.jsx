import './App.css'
import Home from './pages/Home';
import { Provider} from 'react-redux';
import store from './app/store'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path :"/",
    element : <Home />
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
    element:<CartPage />
  },
  {
    path:"/checkout",
    element:<CheckoutPage />
  },
  {
    path:"/product-detail",
    element:<ProductDetailPage />
  }
])

function App() {
  
  return (
    <>
     <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
    </>
  )
}

export default App
