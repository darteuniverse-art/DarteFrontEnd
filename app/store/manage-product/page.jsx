"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "../../../components/Loading";
import { productDummyData } from "../../../assets/assets";

export default function StoreManageProducts() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setProducts(productDummyData);
    setLoading(false);
  };

  const toggleStock = async (productId) => {
    // Logic to toggle the stock of a product
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mb-28 ">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-slate-500 dark:text-slate-400 mb-4 sm:mb-5">
        Manage{" "}
        <span className="text-slate-800 dark:text-white font-medium">
          Products
        </span>
      </h1>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left text-sm min-w-[640px]">
          <thead className="bg-slate-50 text-gray-700 dark:text-slate-400 dark:bg-slate-700 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-3 sm:px-4 py-3">Name</th>
              <th className="px-3 sm:px-4 py-3 hidden lg:table-cell">
                Description
              </th>
              <th className="px-3 sm:px-4 py-3 hidden sm:table-cell">MRP</th>
              <th className="px-3 sm:px-4 py-3">Price</th>
              <th className="px-3 sm:px-4 py-3 text-center">Stock</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-400">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-3 sm:px-4 py-3">
                  <div className="flex gap-2 items-center min-w-[150px]">
                    <Image
                      width={40}
                      height={40}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-cover shadow rounded cursor-pointer flex-shrink-0"
                      src={product.images[0]}
                      alt=""
                    />
                    <span className="truncate max-w-[120px] sm:max-w-[200px] text-xs sm:text-sm">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 sm:px-4 py-3 max-w-xs text-slate-600 dark:text-slate-400 hidden lg:table-cell">
                  <span className="line-clamp-2 text-xs sm:text-sm">
                    {product.description}
                  </span>
                </td>
                <td className="px-3 sm:px-4 py-3 hidden sm:table-cell text-xs sm:text-sm whitespace-nowrap">
                  {currency} {product.mrp.toLocaleString()}
                </td>
                <td className="px-3 sm:px-4 py-3 font-medium text-xs sm:text-sm whitespace-nowrap">
                  {currency} {product.price.toLocaleString()}
                </td>
                <td className="px-3 sm:px-4 py-3 text-center">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() =>
                        toast.promise(toggleStock(product.id), {
                          loading: "Updating data...",
                        })
                      }
                      checked={product.inStock}
                    />
                    <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200 relative">
                      <span className="absolute left-0.5 top-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5 sm:peer-checked:translate-x-5"></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile scroll hint */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 sm:hidden">
        ← Swipe to see more →
      </p>
    </div>
  );
}
