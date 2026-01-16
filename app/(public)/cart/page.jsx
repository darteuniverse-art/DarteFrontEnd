"use client";
import Counter from "../../../components/Counter";
import OrderSummary from "../../../components/OrderSummary";
import PageTitle from "../../../components/PageTitle";
import { deleteItemFromCart } from "../../../lib/features/cart/cartSlice";
import EmptyCart from "../../../components/EmptyCart";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₦";

  const { cartItems } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.list);

  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const createCartArray = () => {
    setTotalPrice(0);
    const cartArray = [];
    for (const [key, value] of Object.entries(cartItems)) {
      const product = products.find((product) => product.id === key);
      if (product) {
        cartArray.push({
          ...product,
          quantity: value,
        });
        setTotalPrice((prev) => prev + product.price * value);
      }
    }
    setCartArray(cartArray);
  };

  const handleDeleteItemFromCart = (productId) => {
    dispatch(deleteItemFromCart({ productId }));
  };

  useEffect(() => {
    if (products.length > 0) {
      createCartArray();
    }
  }, [cartItems, products]);

  return cartArray.length > 0 ? (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-slate-800 dark:text-slate-400 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <PageTitle
          heading="My Cart"
          text="items in your cart"
          linkText="Add more"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                    <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-200">
                      Product
                    </th>
                    <th className="text-center p-4 font-semibold text-slate-700 dark:text-slate-200">
                      Quantity
                    </th>
                    <th className="text-center p-4 font-semibold text-slate-700 dark:text-slate-200">
                      Total
                    </th>
                    <th className="text-center p-4 font-semibold text-slate-700 dark:text-slate-200">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartArray.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex gap-4 items-start">
                          <div className="flex gap-3 items-center justify-center bg-slate-100 dark:bg-slate-700 w-16 h-16 rounded-md flex-shrink-0">
                            <Image
                              src={item.images[0]}
                              className="h-12 w-auto"
                              alt=""
                              width={45}
                              height={45}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {item.category}
                            </p>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-2">
                              {currency}
                              {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Counter productId={item.id} />
                      </td>
                      <td className="p-4 text-center font-medium text-slate-800 dark:text-slate-200">
                        {currency}
                        {(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleDeleteItemFromCart(item.id)}
                          className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2.5 rounded-full active:scale-95 transition-all inline-flex"
                        >
                          <Trash2Icon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-4">
              {cartArray.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 space-y-3"
                >
                  <div className="flex gap-3">
                    <div className="flex gap-3 items-center justify-center bg-slate-100 dark:bg-slate-700 w-20 h-20 rounded-md flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        className="h-16 w-auto"
                        alt=""
                        width={45}
                        height={45}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.category}
                      </p>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-2">
                        {currency}
                        {item.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteItemFromCart(item.id)}
                      className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full active:scale-95 transition-all flex-shrink-0"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        Quantity
                      </p>
                      <Counter productId={item.id} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Total
                      </p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {currency}
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary totalPrice={totalPrice} items={cartArray} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}
