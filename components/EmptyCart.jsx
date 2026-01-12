"use client";

import React from "react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-slate-400 gap-4">
      <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
      <Link
        href="/shop"
        className="text-sm sm:text-base text-slate-600 dark:text-slate-300 hover:underline"
      >
        Browse products
      </Link>
    </div>
  );
}
