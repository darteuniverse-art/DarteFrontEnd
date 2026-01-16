"use client";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function StoreAddProduct() {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Beauty & Health",
    "Toys & Games",
    "Sports & Outdoors",
    "Books & Media",
    "Food & Drink",
    "Hobbies & Crafts",
    "Others",
  ];

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Logic to add a product
  };

  return (
    <form
      onSubmit={(e) =>
        toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })
      }
      className="text-slate-500 dark:text-slate-400 mb-28 w-full pb-10"
    >
      <h1 className="text-2xl md:text-3xl font-bold">
        Add New{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Products
        </span>
      </h1>
      <p className="mt-6 text-base font-medium text-slate-700 dark:text-white">
        Product Images
      </p>

      {/* Responsive Grid: 2 columns on mobile, 4 columns on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 max-w-2xl">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
            <Image
              width={300}
              height={300}
              className="w-full aspect-square object-cover border border-slate-200 dark:border-slate-700 rounded hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.upload_area
              }
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              id={`images${key}`}
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
              hidden
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2 mt-6 max-w-lg">
        <span className="text-base font-medium text-slate-700 dark:text-white">
          Name
        </span>
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={productInfo.name}
          placeholder="Enter product name"
          className="w-full p-2.5 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded focus:ring-2 focus:ring-slate-500 dark:bg-transparent"
          required
        />
      </label>

      <label className="flex flex-col gap-2 mt-6 max-w-lg">
        <span className="text-base font-medium text-slate-700 dark:text-white">
          Description
        </span>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={productInfo.description}
          placeholder="Enter product description"
          rows={5}
          className="w-full p-2.5 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded resize-none focus:ring-2 focus:ring-slate-500 dark:bg-transparent"
          required
        />
      </label>

      {/* Responsive Grid for Prices: Stack on mobile, side-by-side on tablet/desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-lg">
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-slate-700 dark:text-white">
            Actual Price (₦)
          </span>
          <input
            type="number"
            name="mrp"
            onChange={onChangeHandler}
            value={productInfo.mrp}
            placeholder="0"
            className="w-full p-2.5 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded focus:ring-2 focus:ring-slate-500 dark:bg-transparent"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-base font-medium text-slate-700 dark:text-white">
            Offer Price (₦)
          </span>
          <input
            type="number"
            name="price"
            onChange={onChangeHandler}
            value={productInfo.price}
            placeholder="0"
            className="w-full p-2.5 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded focus:ring-2 focus:ring-slate-500 dark:bg-transparent"
            required
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 mt-6 max-w-lg">
        <span className="text-base font-medium text-slate-700 dark:text-white">
          Category
        </span>
        <select
          onChange={(e) =>
            setProductInfo({ ...productInfo, category: e.target.value })
          }
          value={productInfo.category}
          className="w-full p-2.5 px-4 outline-none border border-slate-200 dark:border-slate-700 rounded focus:ring-2 focus:ring-slate-500 dark:bg-slate-900 cursor-pointer"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <button
        disabled={loading}
        className="w-full sm:w-auto bg-slate-800 text-white px-10 py-3 mt-6 hover:bg-slate-900 dark:hover:bg-slate-700 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Product
      </button>
    </form>
  );
}
