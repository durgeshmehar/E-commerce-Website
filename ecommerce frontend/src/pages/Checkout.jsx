/* eslint-disable no-useless-escape */
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { override } from "../app/constants";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectStatus,
} from "../features/order/orderSlice";
import { updateUserAsync } from "../features/user/userSlice";
import { selectUserInfo } from "../features/user/userSlice";
import GridLoader from "react-spinners/GridLoader";

import Modal from "../features/common/Modal";

export default function Checkout() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectStatus);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const currentOrder = useSelector(selectCurrentOrder);

  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = products.reduce(
    (total, item) => total + item.product.DiscountPrice * item.quantity,
    0
  );
  const [showModalId, setShowModalId] = useState(-1);

  const handleReset = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("mobile", "");
    setValue("street", "");
    setValue("city", "");
    setValue("state", "");
    setValue("postalcode", "");
  };

  const handleSelect = (e, cartItem) => {
    dispatch(updateCartAsync({ id: cartItem.id, quantity: +e.target.value }));
  };

  const handleRemove = (id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const handleAddress = (e) => {
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (!selectedAddress) {
      setError("address", {
        type: "manual",
        message: "Please select an address.",
      });
      alert("Please select an address.");
    } else {
      const order = {
        cart: products,
        totalAmount,
        totalItems,
        user: userInfo.id,
        paymentMethod,
        selectedAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    }
    // redirect to order-success page
    //clear cart
    //change stocks on server
  };

  return (
    <>
      {totalItems === 0 && <Navigate to="/"></Navigate>}

      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>
      )}

      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`}> </Navigate>
      )}

      {status === "loading" ? (
        <GridLoader color="rgb(40,116,240)" cssOverride={override} />
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1sgap-y-10 md:grid-cols-5">
            {/* ADDRESS FORM */}
            <div className="col-span-1 md:col-span-3 md:mr-4 ">
              <form
                noValidate
                className="bg-gray-200 mx-auto px-8 mt-4 md:mt-8 w-full"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      id: userInfo.id,
                      addresses: [...(userInfo.addresses || []), data],
                    })
                  );
                  handleReset();
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12 ">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 py-4 ">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            id="name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "Invalid email address",
                              },
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Mobile No.
                        </label>
                        <div className="mt-2">
                          <input
                            id="mobile"
                            {...register("mobile", {
                              required: "Mobile is required",
                              pattern: {
                                value: /^([+]\d{2})?\d{10}$/,
                                message: "Invalid mobile number",
                              },
                            })}
                            type="tel"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.mobile && (
                            <p className="text-red-500">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="street"
                            {...register("street", {
                              required: "Street is required",
                            })}
                            autoComplete="address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "State is required",
                            })}
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("postalcode", {
                              required: "Postal code is required",
                            })}
                            id="postalcode"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Reset
                    </button>
                    <button
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="submit"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12 ">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing addresses
                    </p>
                    <div className="border-b-2 border-gray-200">
                      <ul role="list" className="divide-y divide-gray-100">
                        {userInfo &&
                          userInfo.addresses &&
                          userInfo.addresses.map((address, index) => (
                            <li
                              key={index}
                              className="flex justify-between gap-x-6 py-5"
                            >
                              <div className="flex min-w-0 gap-x-4">
                                <input
                                  {...register("address", {
                                    required:
                                      selectedAddress == null
                                        ? false
                                        : "Address is required",
                                  })}
                                  id={"address" + index}
                                  type="radio"
                                  value={index}
                                  onChange={(e) => {
                                    handleAddress(e);
                                  }}
                                  className="mt-1 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                />
                                <label htmlFor={"address" + index}>
                                  <div className="min-w-0 flex-auto cursor-pointer">
                                    <p className="text-sm font-semibold leading-6 text-gray-900 ">
                                      {address.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                                      {address.street}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-800">
                                      {address.postalcode}
                                    </p>
                                  </div>
                                </label>
                              </div>

                              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                  Phone: {address.mobile}
                                </p>
                                <p className="text-sm leading-6 text-gray-900">
                                  {address.city}, {address.state}
                                </p>
                              </div>
                            </li>
                          ))}
                        {errors.address && (
                          <p className="text-red-500">
                            {errors.address.message}
                          </p>
                        )}
                      </ul>
                    </div>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-xl font-semibold leading-6 text-gray-900">
                          Payment
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose any one payment method
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payment"
                              type="radio"
                              value="cash"
                              checked={paymentMethod === "cash"}
                              onChange={handlePayment}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card-payment"
                              name="payment"
                              type="radio"
                              value="card"
                              onChange={handlePayment}
                              checked={paymentMethod === "card"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                            />
                            <label
                              htmlFor="card-payment"
                              className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* CART */}
            <div className="md:col-span-2">
              <div className="bg-gray-200 mx-auto max-w-7xl px-0 mt-8 ">
                <h1
                  id="products-heading"
                  className="p-4 text-2xl font-semibold text-black"
                >
                  Cart
                </h1>
                <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
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
                                <p className="ml-4">
                                  {item.product.DiscountPrice}
                                </p>
                              </div>
                              <p className="mt-4 text-sm text-gray-800">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div>
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm leading-6 text-gray-800"
                                >
                                  Qty
                                </label>
                                <select
                                  className="text-xs text-gray-800 cursor-pointer"
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

                <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-800">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      className=" cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      onClick={handleOrder}
                    >
                      Buy Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-800">
                    or&nbsp;
                    <Link to="/">
                      {" "}
                      <p className="inline text-blue-600"> Continue Shopping</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
