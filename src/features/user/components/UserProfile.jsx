import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [selectedEditAddressIndex, setSelectedEditAddressIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleSubmitAddress = (AddressData, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, AddressData);
    dispatch(updateUserAsync(newUser));
    setSelectedEditAddressIndex(-1);
  };

  const handleAddNewAddress = (AddressData) => {
    const newUser = { ...user, addresses: [...user.addresses, AddressData] };
    dispatch(updateUserAsync(newUser));
    setShowAddressForm(false);
  };
  const handleNewAddressBtn = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("mobile", "");
    setValue("street","");
    setValue("city", "");
    setValue("state", "");
    setValue("postalcode","");
    setShowAddressForm(true);
    setSelectedEditAddressIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleSelectEdit = (index) => {
    setSelectedEditAddressIndex(index);
    setShowAddressForm(false);
    const address = user.addresses[index];
    console.log("index ,user :", index, user.addresses[index]);
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("mobile", address.mobile);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("postalcode", address.postalcode);
  };

  return (
    <>
      <div className="bg-white mx-auto max-w-7xl px-4 mt-6 sm:px-6 lg:px-8 ">
        <h1 id="products-heading" className="p-4 pb-1 text-2xl font-semibold">
          Name : {user.name ? user.name : " New Name"}
        </h1>
        <h3 className="p-4 pb-1 text-xl font-semibold text-red-400">
          Email : {user.email}
        </h3>
        {user.role === "admin" ? 
        <h3 className="p-4 pb-1 text-xl font-semibold text-red-400">
          Role : {user.role}
        </h3> :null
        }


        <button
          type="button"
          onClick={handleNewAddressBtn}
          className="ml-4 my-4 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New Address
        </button>
        {showAddressForm ? (
          <form
            noValidate
            className="bg-white px-10 mt-8 mb-4"
            onSubmit={handleSubmit((data) => {
              handleAddNewAddress(data);
              reset();
            })}
          >
            <div className="space-y-0 mt-12">
              <div className="border-t border-gray-800/10 pb-12 ">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 py-4 ">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                        <p className="text-red-500">{errors.email.message}</p>
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
                        <p className="text-red-500">{errors.mobile.message}</p>
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
              <div className="flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    setSelectedEditAddressIndex(-1);
                    setShowAddressForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : null}

        <div className="px-4 py-6 sm:px-6">
          <h3 className="p-2 text-xl font-semibold text-black-500">
            Your Addresses
          </h3>
          {user.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditAddressIndex === index ? (
                <form
                  noValidate
                  className="bg-white px-10 mt-8 mb-4"
                  onSubmit={handleSubmit((data) => {
                    handleSubmitAddress(data, index);
                  })}
                >
                  <div className="space-y-0 mt-12">
                    <div className="border-t border-gray-800/10 pb-12 ">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 py-4 ">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    <div className="flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          setSelectedEditAddressIndex(-1);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <div className="flex justify-between px-4 py-6 my-4 sm:px-6 border-2">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.postalcode}
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.mobile}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.city}, {address.state}
                  </p>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                  <button
                    type="button"
                    className=" rounded-md px-8 py-2  bg-blue-400 font-medium text-white  hover:bg-blue-300 mb-2"
                    onClick={() => handleSelectEdit(index)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="rounded-md  px-8 py-2 text-white bg-red-400 font-medium hover:bg-red-300"
                    onClick={(e) => handleRemove(e, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
