/* eslint-disable react/prop-types */
import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLoader from "react-spinners/GridLoader";
import { Link } from "react-router-dom";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFilterAsync,
  selectBrandsArray,
  selectCategoriesArray,
  selectProductListStatus,
  selectProductsArray,
  selectTotalItems,
} from "../../product/productSlice";

import { selectUserInfo } from "../../user/userSlice";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon  } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  StarIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../app/constants";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "DiscountPrice", order: "asc" },
  { name: "Price: High to Low", sort: "DiscountPrice", order: "desc" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};


export default function AdminProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: ITEMS_PER_PAGE,
  });

  const products = useSelector(selectProductsArray);
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectCategoriesArray);
  const brands = useSelector(selectBrandsArray);
  const status = useSelector(selectProductListStatus)
  const dispatch = useDispatch();

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  useEffect(() => {
    dispatch(fetchProductsByFilterAsync({ filter, sort, pagination,admin:true }));
  }, [dispatch, filter, sort, pagination]);

  useEffect(() => {
    setPagination({ _page: 1, _limit: ITEMS_PER_PAGE });
  }, [sort, totalItems]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleFilter = (e, sectionCategory, optionValue) => {
    let newFilter = { ...filter };
    if (e.target.checked === true) {
      if (newFilter[sectionCategory]) {
        newFilter[sectionCategory].push(optionValue);
      } else {
        newFilter[sectionCategory] = [optionValue];
      }
    } else {
      const idx = newFilter[sectionCategory].findIndex(
        (el) => el === optionValue
      );
      newFilter[sectionCategory].splice(idx, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };
  const handlePagination = (pageValue) => {
    const newPagination = { _page: pageValue, _limit: ITEMS_PER_PAGE };
    setPagination(newPagination);
  };
  // this to fetch all products in cart

  const user = useSelector(selectUserInfo);

  return (
    <>
    {status === "loading"? <GridLoader color="rgb(40,116,240)" cssOverride={override} />:null}
    <div className="overflow-hidden">
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        handleFilter={handleFilter}
        filters={filters}
      />

      <main className="overflow-hidden bg-white mx-auto max-w-7xl  mt-4 py-2 pb-1 sm:px-6 lg:px-8 ">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 px-4 pt-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <p
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <DesktopFilter handleFilter={handleFilter} filters={filters} />

            <div className="lg:col-span-3">
              <div className="mb-8">
                <Link
                  to="/admin/product-form"
                  className="ml-4 my-8 px-4 py-2 mb-28  rounded-md bg-green-600  text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Product
                </Link>
              </div>
              {/* productGrid */}
              <ProductGrid products={products} />
            </div>
          </div>
        </section>
      </main>

      <Pagination
        handlePagination={handlePagination}
        pagination={pagination}
        totalItems={totalItems}
      />
    </div>      
    </>
  );
}

export function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 px-4 border-t border-gray-200">
                {filters &&
                  filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={(e) =>
                                      handleFilter(e, section.id, option.value)
                                    }
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters &&
        filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options &&
                      section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            defaultChecked={option.checked}
                            onChange={(e) =>
                              handleFilter(e, section.id, option.value)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
    </form>
  );
}

export function ProductGrid({ products }) {
  return (
    <div>
      <div className="grid items-stretch px-4 gap-10 gap-y-20 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-6 place-content-center place-items-center">
        {products &&
          products.map((product) => (
            <div className="group text-md w-[95%] sm:w-full " key={product.id}>
              <div className="border border-solid border-spacing-2  border-gray-300 rounded-md">
                <Link to={`/product-detail/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1  md:w-full bg-gray-200 lg:aspect-none overflow-hidden rounded-md lg:h-72">
                    <img
                      src={product.thumbnail}
                      className=" h-full w-full object-cover object-center  lg:h-full lg:w-full group-hover:opacity-70 transition-opacity duration-100 cursor-pointer "
                      alt="cloth-image"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between font-medium">
                      <div className="font-normal"> {product.title} </div>{" "}
                      <div>
                        $
                        {product.DiscountPrice}
                      </div>
                    </div>
                    <div className="flex justify-between font-medium py-[2px]">
                      <div>
                        <StarIcon className="w-4 h-4 inline text-yellow-500"></StarIcon>
                        <span className="align-bottom">{product.rating}</span>
                      </div>
                      <div className="opacity-60 font-normal line-through">
                        {" "}
                        {product.price}
                      </div>
                    </div>
                  </div>
                </Link>
                {product.deleted ? <div>
                  <p className="ml-4 text-red-500">Product Deleted</p>
                </div> : null}
                {product.stock==0 ? <div>
                  <p className="ml-4 text-red-500">Out of stock</p>
                </div> : null}
              </div>
              <Link
                type="submit"
                to={`/admin/product-form/edit/${product.id}`}
                onAbort={(e)=>e.stopPropagation()}
                className="mt-4 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

{
  /* <Link
                type="submit"
                to={`/admin/product-form/edit/${product.id}`}
                className="mt-4 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </Link> */
}

export function Pagination({ handlePagination, pagination, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white xs:px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
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
            to{" "}
            <span className="font-medium">
              {pagination._page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : pagination._page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
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
                onClick={() => handlePagination(index + 1)}
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
