import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { override } from "../../app/constants";
import React, { useEffect, useState } from "react";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  selectCartLoaded,
  updateCartAsync,
  fetchItemsByUserIdAsync,
} from "./cartSlice";

import Modal from "../common/Modal";
import GridLoader from "react-spinners/GridLoader";

export default function Cart() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const totalAmount = products.reduce(
    (total, item) => total + item.product.DiscountPrice * item.quantity,
    0
  );
  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const [showModalId, setShowModalId] = useState(-1);

  const handleSelect = (e, product) => {
    dispatch(updateCartAsync({ id: product.id, quantity: +e.target.value }));
  };
  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  useEffect(()=>{
    dispatch(fetchItemsByUserIdAsync())
  },[dispatch])

  return (
    <>
      {cartLoaded && totalItems === 0 && <Navigate to="/"></Navigate>}
      {console.log("cart :", cartLoaded)}

      {cartLoaded === false ? (
        <GridLoader color="rgb(40,116,240)" cssOverride={override} />
      ) : (
        <div className="bg-gray-800  mx-auto max-w-7xl px-4 mt-0 sm:px-6 lg:px-8 ">
          
          <div className=" px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products &&
                  products.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3>
                              <a href={item.product.thumbnail}>
                                {item.product.title}
                              </a>
                            </h3>
                            <p className="ml-4">{item.product.DiscountPrice}</p>
                          </div>
                          <p className="mt-4 text-sm text-gray-200">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-md">
                          <div>
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm leading-6 text-gray-200"
                            >
                              Qty
                            </label>
                            <select
                              className="text-sm bg-slate-500 select-dropdown px-4 rounded-sm border-none"
                              onChange={(e) => {
                                handleSelect(e, item);
                              }}
                              value={item.quantity}
                            >
                              {[
                                ...Array(
                                  Math.min(item.product.stock, 5)
                                ).keys(),
                              ].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex">
                            {showModalId === item.id ? (
                              <Modal
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
                              ></Modal>
                            ) : null}

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
            <div className="flex justify-between text-base font-medium text-white">
              <p>Subtotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-white">
              <p>Total Items</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-200">
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
            <div className="mt-6 flex justify-center text-center text-sm text-gray-200">
              or&nbsp;
              <Link to="/">
                {" "}
                <p className="inline text-blue-600"> Continue Shopping</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
