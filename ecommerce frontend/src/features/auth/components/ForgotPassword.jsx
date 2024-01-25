import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUserAsync, selectRequestError } from "../authSlice";
import { useForm } from "react-hook-form";
import logo from "../../../Images/logo.png";
import { selectMailSent ,resetPasswordRequestAsync} from "../authSlice";

export default function ForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const mailSent = useSelector(selectMailSent);
  const error = useSelector(selectRequestError)

  const handleSendEmail =(data)=>{
    dispatch(resetPasswordRequestAsync(data))
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter email to reset password
          </h2>
        </div>
          <form
            noValidate
            className="mt-12 mx-auto w-[90%] sm:max-w-sm"
            onSubmit={handleSubmit((data) => {
                handleSendEmail(data);
            })}
          >
            <div className="my-4">
              <label
                htmlFor="email"
                className="block text-md font-medium leading-6 text-gray-900"
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
                  <p className="text-red-500 my-4">{errors.email.message}</p>
                )}
                {mailSent && (
                  <p className="text-green-500 my-4">Mail Sent</p>
                )}
                {error &&  (
                  <p className="text-red-500 my-4">{error.message}</p>
                )}
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to 
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
             {" "} Login
            </Link>
          </p>
        </div>
    </>
  );
}
