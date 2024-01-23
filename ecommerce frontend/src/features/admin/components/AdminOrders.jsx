import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
} from "../../order/orderSlice";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { updateOrderAsync } from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableStatusId, setEditableStatusId] = useState(-1);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: ITEMS_PER_PAGE,
  });
  const [sort, setSort] = useState({ _sort: "id", _order: "asc" });

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [sort, pagination]);

  const handlePagination = (page) => {
    setPagination({ ...pagination, _page: page });
  };

  const handleShow = (order) => {
  };
  const handleEdit = (order) => {
    setEditableStatusId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const newOrder = { ...order, status: e.target.value };
    //increase stock if order is cancelled
    dispatch(updateOrderAsync(newOrder));
    setEditableStatusId(-1);
  };
  const handleOrderPaymentStatus = (e, order) => {
    const newOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(newOrder));
    setEditableStatusId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "dispatched":
        return "bg-blue-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      case "received":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-yellow-500 text-white";
    }
  };

  const handleSort = (sortObj) => {
    const newSort = { _sort: sortObj.sort, _order: sortObj.order };
    setSort(newSort);
  };

  return (
    <div className="  mx-auto max-w-[98%]  md:max-w-[95%] lg:max-w-[80%]  mt-4 pb-1 mb-44">
      <div className=" overflow-x-auto bg-white">
        <table className=" w-full table-auto text-left">
          <thead className="bg-gray-300">
            <tr className="text-lg font-semibold align-top ">
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "id", order: order });
                }}
              >
                Order{" "}
                {sort._sort === "id" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
                Items
              </th>
              <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
                Shipping Address
              </th>
              <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
                Qty
              </th>
              <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
                Price($)
              </th>
              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "totalAmount", order: order });
                }}
              >
                Total($)
                {sort._sort === "totalAmount" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "status", order: order });
                }}
              >
                Order Status
                {sort._sort === "status" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "paymentMethod", order: order });
                }}
              >
                Payment Method
                {sort._sort === "paymentMethod" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "paymentStatus", order: order });
                }}
              >
                Payment Status
                {sort._sort === "paymentStatus" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "createdAt", order: order });
                }}
              >
                Order Time
                {sort._sort === "createdAt" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50"
                onClick={() => {
                  const order = sort._order === "asc" ? "desc" : "asc";
                  handleSort({ sort: "updatedAt", order: order });
                }}
              >
                Last Updated
                {sort._sort === "updatedAt" && sort._order === "desc" ? (
                  <ArrowDownIcon className="inline w-4 h-4" />
                ) : (
                  <ArrowUpIcon className="inline w-4 h-4" />
                )}
              </th>

              <th className=" border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 py-6 transition-colors hover:bg-blue-gray-50">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className=" border-b-2 border-gray-300">
                <td className="p-4 py-6 ">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                        {order.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 py-6 ">
                  {order.cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex items-center gap-6 "
                    >
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="inline-block relative object-cover object-center !rounded-full w-9 h-9"
                      />
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="p-4 py-6 ">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                        {order.selectedAddress?.name},
                        {order.selectedAddress?.mobile}
                      </p>
                      <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                        {order.selectedAddress?.street} ,
                      </p>
                      <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                        {order.selectedAddress?.city},{" "}
                        {order.selectedAddress?.postalcode} ,
                        {order.selectedAddress?.state}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  {order.cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex items-center gap-6 "
                    >
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="p-4 py-6 ">
                  {order.cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex items-center gap-6 "
                    >
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                          {item.product.DiscountPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="p-4 py-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.totalAmount}
                    </p>
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  <div className="w-max">
                    {editableStatusId === order.id ? (
                      <select
                        onChange={(e) => handleOrderStatus(e, order)}
                        className="appearance-none border border-blue-gray-300 rounded-md px-3 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                      >
                        <option value="" className="text-gray-400">
                          select
                        </option>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <div
                        className={`${chooseColor(
                          order.status
                        )} relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none  py-1 px-2 text-xs rounded-md`}
                        style={{ opacity: 1 }}
                      >
                        <span className="">{order.status}</span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.paymentMethod}
                    </p>
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  <div className="w-max">
                    {editableStatusId === order.id ? (
                      <select
                        onChange={(e) => handleOrderPaymentStatus(e, order)}
                        className="appearance-none border border-blue-gray-300 rounded-md px-3 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                      >
                        <option value="" className="text-gray-400">
                          select
                        </option>
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                      </select>
                    ) : (
                      <div
                        className={`${chooseColor(
                          order.paymentStatus
                        )} relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none  py-1 px-2 text-xs rounded-md`}
                        style={{ opacity: 1 }}
                      >
                        <span className="">{order.paymentStatus}</span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.createdAt?new Date(order.createdAt).toLocaleString() :null }
                    </p>
                  </div>
                </td>

                <td className="p-4 py-6 ">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans  leading-normal text-blue-gray-900 ">
                      {order.updatedAt ?new Date(order.updatedAt).toLocaleString() :null }
                    </p>
                  </div>
                </td>

                <td className="p-4 py-6">
                  <div className="flex gap-2">
                    {/* <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-gray-600/10 active:bg-blue-500/30"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <EyeIcon
                          className="w-6 h-5"
                          onClick={() => handleShow(order)}
                        />
                      </span>
                    </button> */}

                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-gray-600/10 active:bg-blue-500/30"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <PencilIcon
                          className="w-6 h-5"
                          onClick={() => handleEdit(order)}
                        />
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-8 overflow-x-hidden">
        <Pagination
          handlePagination={handlePagination}
          pagination={pagination}
          totalItems={totalOrders}
        />
      </div>
    </div>
  );
}
