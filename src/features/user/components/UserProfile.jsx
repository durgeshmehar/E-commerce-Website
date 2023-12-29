/* eslint-disable react/jsx-key */
import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserProfile() {
  const user = useSelector(selectLoggedInUser);

//   const handleEdit =(e,index)=>{

//   }
//   const handleRemove =(e,index)=>{

//   }

  return (
    <>
      <div className="bg-white mx-auto max-w-7xl px-4 mt-6 sm:px-6 lg:px-8 ">
        <h1 id="products-heading" className="p-4 pb-1 text-2xl font-semibold">
          Name :{user.name ? user.name : "New Name"}
        </h1>
        <h3 className="p-4 pb-1 text-xl font-semibold ">
          Email Address :{user.email}
        </h3>

        <div className="px-4 py-6 sm:px-6">
          <h3 className="p-2 text-xl font-semibold text-black-500">
            Your Addresses
          </h3>
          {user.addresses.map((address, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-6 sm:px-6 border-2"
            >
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

              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                //   onClick={() => handleEdit(e ,index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                //   onClick={(e) => handleRemove(e ,index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
