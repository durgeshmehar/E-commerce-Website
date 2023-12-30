import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders } from "../../order/orderSlice";
import { EyeIcon,PencilIcon } from "@heroicons/react/24/outline";

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [page, dispatch]);

  return (
    <>
      <table className="w-full min-w-max table-auto text-left">
        <thead className="bg-gray-300">
          <tr className="text-lg font-semibold">
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Order No.
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Items
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Shipping Address
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Quantity
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Amount($)
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Total ($)
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Status
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-4 py-6 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 py-6 border-b border-blue-gray-50">
              {order.cart.map((item) =>(<div key={item.id} className="mb-2 flex items-center gap-6 ">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                  />
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {item.title}
                    </p>
                  </div>
                </div>) )}
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.selectedAddress?.name},{order.selectedAddress?.mobile}
                    </p>
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.selectedAddress?.street} ,
                    </p>
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                    {order.selectedAddress?.city}, {order.selectedAddress?.postalcode} ,{order.selectedAddress?.state}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
              {order.cart.map((item) =>(<div key={item.id} className="mb-2 flex items-center gap-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {item.quantity}
                    </p>
                  </div>
                </div>) )}
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
              {order.cart.map((item) =>(<div key={item.id} className="mb-2 flex items-center gap-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {item.price}
                    </p>
                  </div>
                </div>) )}
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
                <div className="flex flex-col">
                  <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                    {order.totalAmount}
                  </p>
                </div>
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
                <div className="w-max">
                  <div
                    className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
                    style={{ opacity: 1 }}
                  >
                    <span className="">Pending</span>
                  </div>
                </div>
              </td>

              <td className="p-4 py-6 border-b border-blue-gray-50">
                <button
                  className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <EyeIcon className="w-6 h-5"/>
                  </span>
                </button>
                <button
                  className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                  type="button"
                >
                  <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <PencilIcon className="w-6 h-5"/>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className=" text-gray-500  py-1">
                Made with
                <a
                  href="https://www.creative-tim.com/product/soft-ui-dashboard-tailwind"
                  className="text-gray-900 hover:text-gray-800"
                >
                  Soft UI
                </a>
                by
                <a
                  href="https://www.creative-tim.com"
                  className="text-gray-900 hover:text-gray-800"
                >
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
