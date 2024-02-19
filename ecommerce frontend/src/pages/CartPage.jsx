import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/navbar/Navbar";
function CartPage() {
  return (
    <Navbar>
      <div>
        <div className=" mx-auto max-w-7xl px-4 mt-0 sm:px-6 lg:px-8 ">
          <h1 id="products-heading" className="p-4 text-3xl font-semibold">
            Cart
          </h1>
        </div>
        <Cart />
      </div>
    </Navbar>
  );
}

export default CartPage;
