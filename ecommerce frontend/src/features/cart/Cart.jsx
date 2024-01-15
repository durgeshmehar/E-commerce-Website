import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import React, {useState } from "react";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "./cartSlice";
import { discountedPrice } from "../../app/constants";
import Modal from "../common/modal";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const totalAmount = products.reduce(
    (total, item) => total + discountedPrice(item.product) * item.quantity,
    0
  );
  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const [showModalId, setShowModalId] = useState(-1);

  const handleSelect = (e, product) => {
    console.log( "id: ", product.id," quantity:", +e.target.value)
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };
  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {totalItems === 0 && <Navigate to="/"></Navigate>}
      <div className="bg-white mx-auto max-w-7xl px-4 mt-12 sm:px-6 lg:px-8 ">
        <h1 id="products-heading" className="p-4 text-3xl font-semibold">
          Cart
        </h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
            {console.log("Cart Item :",products)}
              {products && products.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.thumbnail}>
                            {item.product.title}
                          </a>
                        </h3>
                        <p className="ml-4">{discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-4 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div>
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm leading-6 text-gray-500"
                        >
                          Qty
                        </label>
                        <select
                          className="text-xs"
                          onChange={(e) => {
                            handleSelect(e, item);
                          }}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                       {showModalId===item.id? <Modal
                          title="Remove Item"
                          message={`Are you sure you want to remove ${item.product.title}`}
                          cancelOption="Cancel"
                          dangerOption="Remove"
                          handleDangerAction={() => {
                            handleRemove(item.id);
                          }}

                          handleCancelAction={() => {
                            setShowModalId(-1);
                          }}
                        ></Modal>:null }

                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModalId(item.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            or&nbsp;
            <Link to="/">
              {" "}
              <p className="inline text-blue-600"> Continue Shopping</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
