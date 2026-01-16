"use client";

import { addToCart } from "../lib/features/cart/cartSlice";
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
  MessageSquareText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {
  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mainImage, setMainImage] = useState(product.images[0]);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId }));
  };

  const averageRating =
    product.rating.reduce((acc, item) => acc + item.rating, 0) /
    product.rating.length;

  return (
    <div className="max-w-7xl mx-auto  py-8">
      {/* Main Grid: 1 Col on Mobile, 2 Cols on Large Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full h-fit">
          {/* Thumbnails */}
          {/* Mobile: Horizontal Scroll row at bottom */}
          {/* Desktop: Vertical stack on left */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar justify-start md:justify-start">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(product.images[index])}
                className={`
                  relative shrink-0 cursor-pointer rounded-lg bg-slate-100 dark:bg-slate-800 
                  w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border-2 transition-all
                  ${
                    mainImage === image
                      ? "border-slate-800 dark:border-slate-400"
                      : "border-transparent"
                  }
                `}
              >
                <Image
                  src={image}
                  className="object-contain p-2 hover:scale-110 transition duration-300"
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                />
              </div>
            ))}
          </div>

          {/* Main Image Display */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl relative aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              width={500}
              height={500}
              className="object-contain w-full h-full p-6 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* --- RIGHT COLUMN: PRODUCT DETAILS --- */}
        <div className="flex flex-col h-full justify-center">
          {/* Title & Ratings */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-slate-200 text-slate-800 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center mt-3 mb-6">
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    size={18}
                    className={`${
                      averageRating >= index + 1
                        ? "fill-[#00C950] text-[#00C950]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
            </div>
            <p className="text-sm ml-3 text-slate-500 font-medium">
              ({product.rating.length} Reviews)
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 mb-2">
            <p className="text-3xl font-bold dark:text-slate-200 text-slate-800">
              {currency}
              {product.price.toLocaleString()}
            </p>
            <p className="text-xl text-slate-400 line-through mb-1">
              {currency}
              {product.mrp.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2 text-green-600 font-medium text-sm mb-8 bg-green-50 dark:bg-green-900/20 w-fit px-3 py-1 rounded-full">
            <TagIcon size={14} />
            <p>
              Save{" "}
              {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}
              % right now
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 mb-8">
            {cart[productId] && (
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                  Quantity
                </p>
                <Counter productId={productId} />
              </div>
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                onClick={() =>
                  !cart[productId] ? addToCartHandler() : router.push("/cart")
                }
                className="flex-1 sm:flex-none bg-slate-900 text-white px-8 py-3.5 text-sm font-semibold rounded-lg hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 active:scale-95 transition shadow-lg shadow-slate-200 dark:shadow-none min-w-[160px]"
              >
                {!cart[productId] ? "Add to Cart" : "View Cart"}
              </button>

              <button className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 active:scale-95 transition text-slate-600 dark:text-white border border-transparent dark:border-slate-700">
                <MessageSquareText size={20} />
              </button>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-500 text-sm">
            <p className="flex items-center gap-3">
              <EarthIcon className="text-slate-400 shrink-0" size={20} />
              Free shipping worldwide
            </p>
            <p className="flex items-center gap-3">
              <CreditCardIcon className="text-slate-400 shrink-0" size={20} />
              100% Secured Payment
            </p>
            <p className="flex items-center gap-3">
              <UserIcon className="text-slate-400 shrink-0" size={20} />
              Trusted by top brands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
