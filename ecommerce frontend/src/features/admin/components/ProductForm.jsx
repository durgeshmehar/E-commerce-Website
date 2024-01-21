import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Modal from "../../common/modal";
import {
  selectBrandsArray,
  selectProduct,
  updateProductAsync,
  clearSelectedProduct,
  selectCategoriesArray,
  addProductAsync,
  fetchProductByIdAsync,
} from "../../product/productSlice";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" ,id:"white" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" ,id:"gray" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" ,id:"black" },
];

const sizes = [
  { name: "XXS", inStock: false ,id:"xxs" },
  { name: "XS", inStock: true ,id:"xs" },
  { name: "S", inStock: true ,id:"s" },
  { name: "M", inStock: true ,id:"m" },
  { name: "L", inStock: true ,id:"l" },
  { name: "XL", inStock: true ,id:"xl" },
  { name: "2XL", inStock: true ,id:"2xl" },
  { name: "3XL", inStock: true  ,id:"3xl"},
];

export default function ProductForm() {
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector(selectCategoriesArray);
  const brands = useSelector(selectBrandsArray);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProduct);
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product)).then(() => {
      setShowModal(false);
      navigate("/admin");
    });
  };

  const handleSubmitAndUpdate = (data) => {
    const product = { ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.thumbnail,
    ];
    product.rating = 0;
    product.discountPercentage = +product.discountPercentage;
    product.stock = +product.stock;
    product.price = +product.price;
    product.colors = product.colors.map((color)=>colors.find((c)=>c.id===color))
    product.sizes = product.sizes.map((size)=>sizes.find((s)=>s.id===size))
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    product.highlights = [product.highlight1,product.highlight2,product.highlight3,product.highlight4]
    delete product["highlight1"];
    delete product["highlight2"];
    delete product["highlight3"];
    delete product["highlight4"];

    if (params.id) {
      product.id = params.id;
      product.rating = selectedProduct.rating || 0;
      dispatch(updateProductAsync(product)).then(() => {
        alert.success("Product Updated");
        reset();
        dispatch(clearSelectedProduct());
        navigate("/admin");
      });
    } else {
      console.log("product :", product);
      dispatch(addProductAsync(product));
      reset();
      alert.show("Product Added successfully");
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [params, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      console.log("selectedProduct :", selectedProduct);
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("highlight1", selectedProduct.highlights[0]);
      setValue("highlight2", selectedProduct.highlights[1]);
      setValue("highlight3", selectedProduct.highlights[2]);
      setValue("highlight4", selectedProduct.highlights[3]);
      setValue("colors", selectedProduct.colors.map((color)=>color.id));
      setValue("sizes", selectedProduct.sizes.map(size=>size.id));
    }
  }, [selectedProduct, params.id, setValue,dispatch]);

  return (
    <div className="bg-white mx-auto max-w-7xl  mt-4 py-2 pb-1 px-16">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          handleSubmitAndUpdate(data);
        })}
      >
        <div className="space-y-1 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              {params.id ? "Update " : "Add "} Product
            </h2>

            <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
              {selectedProduct && selectedProduct.deleted && (
                <div className="sm:col-span-6">
                  <p className="text-red-500">Product is deleted already.</p>
                </div>
              )}
              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("title", {
                        required: "product name is required",
                      })}
                      id="title"
                      autoComplete="product-name"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    autoComplete="information"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {" "}
                  Write few information about product
                </p>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("price", {
                        required: "price is required",
                        min: 0,
                      })}
                      id="price"
                      autoComplete="price"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount (%)
                </label>
                <div className="mt-2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      autoComplete="discountPercentage"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      autoComplete="stock"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                        min: 0,
                      })}
                      id="thumbnail"
                      autoComplete="thumbnail"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="image1">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image is required",
                      })}
                      id="image1"
                      autoComplete="image1"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="image2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image is required",
                      })}
                      id="image2"
                      autoComplete="image2"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="image3">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image is required",
                      })}
                      id="image3"
                      autoComplete="image3"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 1
                </label>
                <div className="highlight1">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("highlight1", {
                        required: "highlight1 is required",
                      })}
                      autoComplete="highlight1"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 2
                </label>
                <div className="highlight2">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("highlight2", {
                        required: "highlight2 is required",
                      })}
                      autoComplete="highlight2"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>


              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 3
                </label>
                <div className="highlight3">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("highlight3", {
                        required: "highlight3 is required",
                      })}
                      autoComplete="highlight3"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 4
                </label>
                <div className="highlight4">
                  <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      {...register("highlight4", {
                        required: "highlight4 is required",
                      })}
                      autoComplete="highlight4"
                      className="w-full block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                    id="brand"
                  >
                    <option value="">-- Choose brand --</option>
                    {brands.map((brand, idx) => (
                      <option key={idx} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                    id="category"
                  >
                    <option value="">-- Choose category --</option>
                    {categories.map((category, idx) => (
                      <option key={idx} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3 my-4">
          <label
            htmlFor="colors"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Colors
          </label>

          <div className="mt-2">
           {
            colors.map( (color)=>(
              <span className="mx-4" key={color.id}>
                  <input className="mx-3" type="checkbox" {...register("colors",{})} id="colors"
                    value={color.id} />{color.name}
              </span>
            ))
           }
          </div>
        </div>

        <div className="sm:col-span-3 my-4">
          <label
            htmlFor="sizes"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sizes
          </label>

          <div className="mt-2">
           {
            sizes.map((size)=>(
              <span className="mx-4" key={size.id}>
                  <input className="mx-3" type="checkbox" {...register('sizes')} 
                    value={size.id} />{size.name}
              </span>
            ))
           }
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We will always let you know about important changes, but you pick
            what else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="flex items-center justify-center">
            <div>
              {showModal ? (
                <Modal
                  title="Delete Item"
                  message={`Are you sure you want to delete`}
                  cancelOption="Cancel"
                  dangerOption="Delete"
                  handleDangerAction={() => {
                    handleDelete();
                  }}
                  handleCancelAction={() => {
                    setShowModal(false);
                  }}
                />
              ) : null}

              {selectedProduct && !selectedProduct.deleted ? (
                <button
                  type="button"
                  onClick={(e) => {
                    setShowModal(true);
                  }}
                  className=" align-middle mt-12 mr-8 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete Product
                </button>
              ) : null}
            </div>

            <button
              type="submit"
              onClick={() => {
                reset();
                navigate("/admin");
              }}
              className=" align-middle mt-12 mr-8 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className=" align-middle mt-12 mr-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {params.id ? "Update " : "Add "} Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
