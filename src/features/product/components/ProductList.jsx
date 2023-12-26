import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllProductsAsync,
  fetchProductsByFilterAsync,
  fetchProductsBySortAsync,
  increment,
  selectProductsArray,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
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

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "smartphones", checked: false },
      { value: "laptops", label: "laptops", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "skincare", label: "skincare", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      {
        value: "home-decoration",
        label: "home decoration",
        checked: false,
      },
      { value: "furniture", label: "furniture", checked: false },
      { value: "tops", label: "tops", checked: false },
      { value: "womens-dresses", label: "womens dresses", checked: false },
      { value: "womens-shoes", label: "womens shoes", checked: false },
      { value: "mens-shirts", label: "mens shirts", checked: false },
      { value: "mens-shoes", label: "mens shoes", checked: false },
      { value: "mens-watches", label: "mens watches", checked: false },
      { value: "womens-watches", label: "womens watches", checked: false },
      { value: "womens-bags", label: "womens bags", checked: false },
      {
        value: "womens-jewellery",
        label: "womens jewellery",
        checked: false,
      },
      { value: "sunglasses", label: "sunglasses", checked: false },
      { value: "automotive", label: "automotive", checked: false },
      { value: "motorcycle", label: "motorcycle", checked: false },
      { value: "lighting", label: "lighting", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Apple", label: "Apple", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
      { value: "OPPO", label: "OPPO", checked: false },
      { value: "Huawei", label: "Huawei", checked: false },
      {
        value: "Microsoft Surface",
        label: "Microsoft Surface",
        checked: false,
      },
      { value: "Infinix", label: "Infinix", checked: false },
      { value: "HP Pavilion", label: "HP Pavilion", checked: false },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
        checked: false,
      },
      { value: "Royal_Mirage", label: "Royal_Mirage", checked: false },
      {
        value: "Fog Scent Xpressio",
        label: "Fog Scent Xpressio",
        checked: false,
      },
      { value: "Al Munakh", label: "Al Munakh", checked: false },
      {
        value: "Lord - Al-Rehab",
        label: "Lord   Al Rehab",
        checked: false,
      },
      { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },
      { value: "Hemani Tea", label: "Hemani Tea", checked: false },
      { value: "Dermive", label: "Dermive", checked: false },
      {
        value: "ROREC White Rice",
        label: "ROREC White Rice",
        checked: false,
      },
      { value: "Fair & Clear", label: "Fair & Clear", checked: false },
      { value: "Saaf & Khaas", label: "Saaf & Khaas", checked: false },
      {
        value: "Bake Parlor Big",
        label: "Bake Parlor Big",
        checked: false,
      },
      {
        value: "Baking Food Items",
        label: "Baking Food Items",
        checked: false,
      },
      { value: "fauji", label: "fauji", checked: false },
      { value: "Dry Rose", label: "Dry Rose", checked: false },
      { value: "Boho Decor", label: "Boho Decor", checked: false },
      { value: "Flying Wooden", label: "Flying Wooden", checked: false },
      { value: "LED Lights", label: "LED Lights", checked: false },
      { value: "luxury palace", label: "luxury palace", checked: false },
      { value: "Golden", label: "Golden", checked: false },
      {
        value: "Furniture Bed Set",
        label: "Furniture Bed Set",
        checked: false,
      },
      {
        value: "Ratttan Outdoor",
        label: "Ratttan Outdoor",
        checked: false,
      },
      { value: "Kitchen Shelf", label: "Kitchen Shelf", checked: false },
      { value: "Multi Purpose", label: "Multi Purpose", checked: false },
      { value: "AmnaMart", label: "AmnaMart", checked: false },
      {
        value: "Professional Wear",
        label: "Professional Wear",
        checked: false,
      },
      { value: "Soft Cotton", label: "Soft Cotton", checked: false },
      { value: "Top Sweater", label: "Top Sweater", checked: false },
      {
        value: "RED MICKY MOUSE..",
        label: "RED MICKY MOUSE..",
        checked: false,
      },
      {
        value: "Digital Printed",
        label: "Digital Printed",
        checked: false,
      },
      { value: "Ghazi Fabric", label: "Ghazi Fabric", checked: false },
      { value: "IELGY", label: "IELGY", checked: false },
      { value: "IELGY fashion", label: "IELGY fashion", checked: false },
      {
        value: "Synthetic Leather",
        label: "Synthetic Leather",
        checked: false,
      },
      {
        value: "Sandals Flip Flops",
        label: "Sandals Flip Flops",
        checked: false,
      },
      { value: "Maasai Sandals", label: "Maasai Sandals", checked: false },
      {
        value: "Arrivals Genuine",
        label: "Arrivals Genuine",
        checked: false,
      },
      {
        value: "Vintage Apparel",
        label: "Vintage Apparel",
        checked: false,
      },
      { value: "FREE FIRE", label: "FREE FIRE", checked: false },
      { value: "The Warehouse", label: "The Warehouse", checked: false },
      { value: "Sneakers", label: "Sneakers", checked: false },
      { value: "Rubber", label: "Rubber", checked: false },
      { value: "Naviforce", label: "Naviforce", checked: false },
      { value: "SKMEI 9117", label: "SKMEI 9117", checked: false },
      { value: "Strap Skeleton", label: "Strap Skeleton", checked: false },
      { value: "Stainless", label: "Stainless", checked: false },
      {
        value: "Eastern Watches",
        label: "Eastern Watches",
        checked: false,
      },
      { value: "Luxury Digital", label: "Luxury Digital", checked: false },
      { value: "Watch Pearls", label: "Watch Pearls", checked: false },
      { value: "Bracelet", label: "Bracelet", checked: false },
      { value: "LouisWill", label: "LouisWill", checked: false },
      {
        value: "Copenhagen Luxe",
        label: "Copenhagen Luxe",
        checked: false,
      },
      { value: "Steal Frame", label: "Steal Frame", checked: false },
      { value: "Darojay", label: "Darojay", checked: false },
      {
        value: "Fashion Jewellery",
        label: "Fashion Jewellery",
        checked: false,
      },
      { value: "Cuff Butterfly", label: "Cuff Butterfly", checked: false },
      {
        value: "Designer Sun Glasses",
        label: "Designer Sun Glasses",
        checked: false,
      },
      { value: "mastar watch", label: "mastar watch", checked: false },
      { value: "Car Aux", label: "Car Aux", checked: false },
      { value: "W1209 DC12V", label: "W1209 DC12V", checked: false },
      { value: "TC Reusable", label: "TC Reusable", checked: false },
      { value: "Neon LED Light", label: "Neon LED Light", checked: false },
      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "METRO 70cc Motorcycle   MR70",
        checked: false,
      },
      { value: "BRAVE BULL", label: "BRAVE BULL", checked: false },
      { value: "shock absorber", label: "shock absorber", checked: false },
      { value: "JIEPOLLY", label: "JIEPOLLY", checked: false },
      { value: "Xiangle", label: "Xiangle", checked: false },
      {
        value: "lightingbrilliance",
        label: "lightingbrilliance",
        checked: false,
      },
      { value: "Ifei Home", label: "Ifei Home", checked: false },
      { value: "DADAWU", label: "DADAWU", checked: false },
      { value: "YIOSI", label: "YIOSI", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const products = useSelector(selectProductsArray);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState([]); // [{},{}
  useState(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  const handleFilterChange = (e, sectionId, option) => {
    const value = [...filter, { [sectionId]: option }];
    setFilter(value);
    dispatch(fetchProductsByFilterAsync(value));
  };
  const handleSort = (e, option) => {
    const value = { [option.sort]: option.order };
    console.log("value", value);
    dispatch(fetchProductsBySortAsync(value));
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        handleFilterChange={handleFilterChange}
      />

      <main className="mx-auto">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 px-4 pt-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
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
            <DesktopFilter handleFilterChange={handleFilterChange} />
            <div className="lg:col-span-3">
              <ProductGrid products={products} />
            </div>
          </div>
        </section>
      </main>

      <Pagination />
    </>
  );
}

export function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilterChange,
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
                {filters.map((section) => (
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
                                    handleFilterChange(
                                      e,
                                      section.id,
                                      option.value
                                    )
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
export function DesktopFilter({ handleFilterChange }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
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
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) =>
                          handleFilterChange(e, section.id, option.value)
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
      <div className="grid items-stretch gap-10 gap-y-20 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:gap-x-6">
        {products &&
          products.map((product) => (
            <div
              className="group text-md  border border-solid border-spacing-2  border-gray-300 rounded-md"
              key={product.id}
            >
              <Link to="/product-detail">
                <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 lg:aspect-none overflow-hidden rounded-md lg:h-72">
                  <img
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-70 transition-opacity duration-100 cursor-pointer "
                    alt="cloth-image"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between font-medium">
                    <div className="font-normal"> {product.title} </div>{" "}
                    <div>
                      $
                      {Math.round(
                        product.price -
                          (product.discountPercentage * product.price) / 100
                      )}{" "}
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
            </div>
          ))}
      </div>
    </div>
  );
} 

export function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white xs:px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
