import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../../Images/logo.png";
import { Navigate } from "react-router-dom";
import {
  resetPasswordAsync,
  selectPasswordResetStatus,
  selectResetPasswordError,
} from "../authSlice";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function ResetPassword() {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const error = useSelector(selectResetPasswordError);
  const [type, setType] = useState("password");
  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const passwordResetStatus = useSelector(selectPasswordResetStatus);

  const dispatch = useDispatch();

  const handleSend = (data) => {
    dispatch(resetPasswordAsync({ token, email, password: data.password }));
  };

  return (
    <>
      {passwordResetStatus && <Navigate to="/login" replace={true} />}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

          <form
            noValidate
            className="mt-12 mx-auto w-[90%] sm:max-w-sm"
            onSubmit={handleSubmit((data) => {
              handleSend(data);
            })}
          >
            <div className="my-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            </div>

            <div className="my-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Password doesn't match",
                    validate: (value, formValues) =>
                      value === formValues.password || "Password doesn't match",
                  })}
                  type={type}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
            </div>

            <div className="my-4 ">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>

          {passwordResetStatus && (
            <p className="text-green-500 my-2">Password Reset</p>
          )}
          {error && <p className="text-red-500 my-2">{error.message}</p>}
          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>

      </div>
    </>
  );
}
