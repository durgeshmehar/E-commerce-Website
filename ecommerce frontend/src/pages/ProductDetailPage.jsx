import React from "react";
import ProductDetail from "../features/product/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductByIdAsync } from "../features/product/productSlice";
import { selectSingleProductStatus } from "../features/product/productSlice";
import { useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import { useDispatch } from "react-redux";
import { override } from "../app/constants";

export default function ProductDetailPage() {
  const singleProductStatus = useSelector(selectSingleProductStatus);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {singleProductStatus === "loading" ? (
        <GridLoader color="rgb(40,116,240)" cssOverride={override} />
      ) : (
        <Navbar>
          <ProductDetail />
          {/* <Footer></Footer> */}
        </Navbar>
      )}
    </>
  );
}
