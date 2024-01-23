import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";

export default function Pagination({
  handlePagination,
  pagination,
  totalItems,
}) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex flex-col border-t border-gray-200 bg-white px-6 py-3 sm:px-8">
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <div
          onClick={() =>
            handlePagination(
              pagination._page - 1 >= 1
                ? pagination._page - 1
                : pagination._page
            )
          }
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>

        <div >
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination._page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {pagination._page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : pagination._page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span>
          </p>
        </div>
        <div
          onClick={() =>
            handlePagination(
              pagination._page + 1 <= totalPages
                ? pagination._page + 1
                : pagination._page
            )
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination._page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {pagination._page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : pagination._page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span>
          </p>
        </div>

        <div className="hidden sm:block">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={() =>
                handlePagination(
                  pagination._page - 1 >= 1
                    ? pagination._page - 1
                    : pagination._page
                )
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPages }).map((val, index) => (
              <div
                key={index}
                onClick={() => {
                  handlePagination(index + 1);
                }}
                aria-current="page"
                className={`cursor-pointer relative z-10 inline-flex items-center ${
                  index + 1 === pagination._page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 "
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={() =>
                handlePagination(
                  pagination._page + 1 <= totalPages
                    ? pagination._page + 1
                    : pagination._page
                )
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
