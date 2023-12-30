/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import store from "./app/store";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/Protected";
import { OrderSuccessPage } from "./pages/OrderSuccessPage";
import AdminProtected from "./features/auth/AdminProtected";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";

import { Provider} from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PageNotFound } from "./pages/404Page";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />{" "}
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage /> </Protected>
  },
  {
    path: "/orders",
    element: <Protected> <UserOrdersPage /> </Protected>,
  },
  {
    path: "/profile",
    element: <Protected> <UserProfilePage /> </Protected>,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/admin",
    element: <AdminProtected><AdminHome></AdminHome> </AdminProtected>
  },
  {
    path: "/admin/product-detail/:id",
    element: <AdminProtected><AdminProductDetailPage></AdminProductDetailPage> </AdminProtected>
  },
  {
    path: "/admin/product-form",
    element: <AdminProtected><AdminProductFormPage></AdminProductFormPage> </AdminProtected>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <AdminProtected><AdminProductFormPage></AdminProductFormPage> </AdminProtected>
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;
