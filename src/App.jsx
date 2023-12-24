import './App.css'
import Home from './pages/Home';
import { Provider} from 'react-redux';
import store from './app/store'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/CartPage';

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
