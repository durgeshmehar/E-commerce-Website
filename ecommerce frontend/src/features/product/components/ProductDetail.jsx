import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectProduct,
  selectProductListStatus,
  selectSingleProductStatus,
} from "../productSlice";
import { updateCartAsync } from "./../../cart/cartSlice";
import { fetchProductByIdAsync } from "../productSlice";
import { addToCartAsync, selectCartItems } from "./../../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "./../../user/userSlice";
import { useAlert } from "react-alert";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        "borderRadius": "50%",
        "padding": "0",
        "margin":"0",
        opacity: "1",
        "color":"red",
        scale: "2",
        marginRight: "-20px",
        zIndex: "100",
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        "borderRadius": "50%",
        "padding": "0",
        "margin":"0",
        opacity: "1",
        scale: "2",
        marginLeft: "-20px",
        zIndex: "100",
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 2,
  slidesToScroll: 2,
  swipeToSlide: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        nextArrow: null,
        prevArrow: null,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        nextArrow: null,
        prevArrow: null,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: null,
        prevArrow: null,
      },
    },
  ],
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1); // [1,2,3,4,5
  const product = useSelector(selectProduct);

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();



  const handleCart = (e) => {
    e.preventDefault();
    if (cartItems.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = { quantity: quantity, product: product.id };
      if (selectedSize) newItem.size = selectedSize;
      if (selectedColor) newItem.color = selectedColor;
      dispatch(addToCartAsync(newItem)).then(() => {
        navigate("/cart-item");
      });
      alert.success("Item added to cart");
    } else {
      alert.show("Item already added");
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setQuantity(+e.target.value);
  };
  return (
    <>
      {product && (
        <div className="bg-slate-900 mx-auto max-w-7xl mt-4 py-2 pb-1 md:px-6 lg:px-8 overflow-x-hidden">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {product &&
                  product.breadcrumbs &&
                  product.breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center">
                        <div className="mr-2 text-md font-medium text-gray-200">
                          {product.title}
                        </div>
                        <svg
                          width={16}
                          height={20}
                          viewBox="0 0 16 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-4 text-gray-300"
                        >
                          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                <li className="text-sm">
                  <div
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.title}
                  </div>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mt-4 md:p-8 max-h-[50%] ">
              <Slider {...settings}>
                {product.images &&
                  product.images.map((imgLink, index) => (
                    <div
                      key={index}
                      className="space-x-4 hidden md:block md:p-4  h-[40vh] md:h-[50vh]"
                    >
                      <img
                        key={index}
                        src={imgLink}
                        alt={product.title}
                        className="w-full h-full hover:lg:border-2 border-gray-300"
                      />
                    </div>
                  ))}
              </Slider>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex flex-row justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-200 sm:text-3xl">
                  {product.title}
                </h1>
                <div className="mt-4">
                  {product.stock <= 0 ? (
                    <div>
                      <p className=" font-semibold text-red-500">
                        Out of stock
                      </p>
                    </div>
                  ) : null}
                  {product.stock <= 10 && product.stock >= 1 ? (
                    <div>
                      <p className=" font-semibold text-[rgb(199,0,85)]">
                        Only {product.stock} left
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-200">
                  $ {product.DiscountPrice}
                </p>
                <p className="text-lg tracking-tight  text-gray-200 mt-2">
                  <span className="line-through opacity-[0.6]">
                    $ {product.price}
                  </span>
                  <span className="text-green-700 font-semibold ml-2">
                    {" "}
                    {product.discountPercentage}% off{" "}
                  </span>
                </p>

                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="border-2 rounded-md mt-1 px-1 bg-green-600 border-none text-white">
                        <p className="inline align-bottom mt-1">
                          {product.rating}
                        </p>{" "}
                        <StarIcon className="w-3 h-3 mb-1 inline"></StarIcon>
                      </div>{" "}
                      {/* {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-yellow-300"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))} */}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    {/* <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a> */}
                  </div>
                </div>

                <form className="mt-6 mx-auto">
                  {/* Colors */}
                  <div className="flex justify-between">
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-200">
                          Color
                        </h3>

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {product.colors &&
                              product.colors.map((color) => (
                                <RadioGroup.Option
                                  key={color.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked ? "ring-2 ring-indigo-500": "",
                                      !active && checked ? "ring-2 ring-indigo-500" : "", "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none outline-none "
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {color.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color.class,
                                      "h-10 w-10 rounded-full border border-gray-400"
                                    )}
                                  />
                                </RadioGroup.Option>
                              ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <div className=" align-middle">
                      <label
                        htmlFor="quantity"
                        className=" block text-sm font-medium text-gray-200"
                      >
                        Qty
                      </label>
                      <select
                        className="text-xs mt-4 text-white bg-slate-700"
                        onChange={(e) => {
                          handleSelect(e);
                        }}
                        value={product.quantity}
                      >
                        {[...Array(Math.min(product.stock, 5)).keys()].map(
                          (_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-200">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {product.sizes &&
                            product.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={!size.inStock}
                                className={({ active }) =>
                                  classNames(
                                    size.inStock
                                      ? "cursor-pointer bg-slate-700 text-gray-200 shadow-sm"
                                      : "cursor-not-allowed bg-slate-600 text-gray-200",
                                    active ? "ring-2 ring-indigo-500" : "",
                                    "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-slate-500 text-white focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="span">
                                      {size.name}
                                    </RadioGroup.Label>
                                    {size.inStock ? (
                                      <span
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-indigo-500"
                                            : "border-transparent",
                                          "pointer-events-none absolute -inset-px rounded-md"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                      >
                                        <svg
                                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  <button
                    type="submit"
                    onClick={handleCart}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-200">
                      {product.description}
                    </p>
                  </div>
                </div>

                {product.highlights && product.highlights.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-200">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-base"
                      >
                        {product.highlights &&
                          product.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-400">
                              <span className="text-gray-400">{highlight}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <h2 className="text-lg font-medium text-gray-200">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className=" text-base text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
