import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { override } from "../../../app/constants";
import {
  selectLoggedInUser,
  loginUserAsync,
  selectLoginError,
  selectStatus,
} from "../authSlice";
import logo from "../../../Images/logo.png";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectLoginError);
  const user = useSelector(selectLoggedInUser);
  {
    /* show password  */
  }
  const [type, setType] = useState("password");
  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const status = useSelector(selectStatus);

  return (
    <>
      {user && user.role === "user" && <Navigate to="/"></Navigate>}
      {user && user.role === "admin" && <Navigate to="/admin"></Navigate>}

      {status === "loading" ? (
        <GridLoader color="rgb(40,116,240)" cssOverride={override} />
      ) : (
        <div className="bg-slate-900 h-[100lvh] w-[100lvw]">
          <div className="flex flex-1 flex-col justify-center pt-16 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-20 w-auto"
                src={logo}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
                Sign in to your account
              </h2>
            </div>

            <form
              noValidate
              className="mt-8 mx-auto w-[90%] sm:max-w-sm"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({ email: data.email, password: data.password })
                );
              })}
            >
              <div className="my-8">
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-200"
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
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="my-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-medium leading-6 text-gray-200"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message: `- at least 8 characters\n
            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
            - Can contain special characters`,
                      },
                    })}
                    type={type}
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  {/* show password  */}
                  <span
                    className="absolute top-1/2 transform -translate-y-1/2 right-2"
                    onClick={handleToggle}
                  >
                    {type === "password" ? (
                      <Icon icon={eyeOff} className="h-8 w-8 text-black" />
                    ) : (
                      <Icon icon={eye} className="h-8 w-8 text-black" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {error && (
                  <p className="text-red-500">{error || error.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
