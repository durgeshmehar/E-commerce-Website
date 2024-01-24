/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, selectUserInfoStatus, selectUserOrder } from "../userSlice";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";
import GridLoader from "react-spinners/GridLoader";

const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "text-black-600 ";
      case "dispatched":
        return "text-blue-600 ";
      case "completed":
        return "text-green-600 ";
      case "received":
        return "text-green-600 ";
      case "cancelled":
        return "text-red-600 ";
      default:
        return "text-black-600 ";
    }
  };

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrder);
  const status = useSelector(selectUserInfoStatus)
  

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
    {status === "loading"? <GridLoader color="rgb(40,116,240)" cssOverride={override} />:null}
      {orders && orders.length >0?
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-sm mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8 "
          >
            <h1
              id="products-heading"
              className="p-4 pb-1 text-xl font-semibold"
            >
              Order #{order.id}
            </h1>
            {/* <h3 className=" text-red-500">
              Order Status : {order.status}
            </h3> */}
            <div className={`${chooseColor(order.status)} pl-4 py-1 text-xl`}>
              Order Status : {order.status}
            </div>
            <div className={`${chooseColor(order.paymentStatus)} pl-4 pb-4 text-xl`}>
              Payment Status : {order.paymentStatus}
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.cart &&
                    order.cart.map((item) => (
                      <li key={item.product.id} className=" flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between  text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.thumbnail}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">{ item.product.DiscountPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                          <div className="text-base font-medium text-gray-700 mt-4">
                            <h3>Qty : {item.quantity}</h3>
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

                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
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
        )) : <div className="text-center text-md mt-16">No Orders Found</div>}
    </>
  );
}
