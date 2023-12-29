/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserOrder } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <>
      {orders &&
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white mx-auto max-w-7xl px-4 mt-6 sm:px-6 lg:px-8 "
          >
            <h1
              id="products-heading"
              className="p-4 pb-1 text-xl font-semibold"
            >
              Order #{order.id}
            </h1>
            <h3 className="p-2 text-xl text-red-500">
              Order Status : {order.status}
            </h3>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.cart &&
                    order.cart.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between  text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.thumbnail}>{product.title}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                          <div className="text-base font-medium text-gray-700 mt-4">
                            <h3>Qty : {product.quantity}</h3>
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
                <p>$ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items</p>
                <p>{order.totalItems} items</p>
              </div>
            </div>

            <div className="px-4 py-6 sm:px-6">
              <h3 className="p-2 text-xl font-semibold text-gray-500">
                Shipping Address
              </h3>
              {order.selectedAddress && (
                <div className="flex justify-between px-4 py-6 sm:px-6 border-2">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.selectedAddress.postalcode}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAddress.mobile}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {order.selectedAddress.city},{" "}
                      {order.selectedAddress.state}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
}
