import React, { useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetOrder } from '../features/order/orderSlice';
import { FcOk } from "react-icons/fc";

export function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  //reset cart & reset currentOrder
  useEffect(() => {
    dispatch(resetCartAsync())
    dispatch(resetOrder())
  },[dispatch,params])

  return (
    <>
    {!params.id && <Navigate to="/" replace={true} />}
    <div className="flex flex-col items-center">
        <div className="text-center w-[90%]  md:w-[70vw] lg:w-[50vw] m-16 mt-28 flex flex-col items-center justify-center bg-gray-200 py-24 px-16">
          <p className="text-4xl font-bold text-black">Your order has been received</p>
           <div className="mt-8 mb-4  mx-auto"> <FcOk className="w-16 h-16" /> </div>
           <h1 className="font-bold text-2xl mb-2 text-gray-900">Thank you for your purchase !</h1>
          <h1 className="mt-4 text-xl  tracking-tight text-gray-900">
           Your order ID is : {params?.id}
          </h1>
          <p className="mt-4 text-xl  tracking-tight text-gray-900">You will receive an order confirmation email with details of your order.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-orange-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
                CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
