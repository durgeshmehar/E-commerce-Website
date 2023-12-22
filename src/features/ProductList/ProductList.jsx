import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./productlistSlice";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function ProductList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
    <div class="text-center">
      <div>
        <h1 class="text-3xl font-bold pb-8">Customers also purchased Items</h1> 
      </div>
      
      <div class="flex gap-10 place-content-center">

        {products.map((product)=>(
          <div class="w-2/12 h-2 text-md bg-slate-900">
            
            <div class="rounded-lg bg-violet-600 mb-4 pb-2"><img src={product.imageSrc} alt="cloth-image" /></div>
            <div>
              <div class="flex justify-between font-medium"> <div> {product.name} </div> <div> {product.price} </div> </div>
              <div class="text-start opacity-[0.9]"> {product.color} </div>
            </div>
          </div>
        ))}

      </div>


      
    </div>
      
    </>
  );
}
