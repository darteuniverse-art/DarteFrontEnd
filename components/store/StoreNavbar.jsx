"use client";
import Link from "next/link";
import Logo from "../Logo";

const StoreNavbar = () => {
  return (
    <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 dark:border-slate-700 transition-all">
      <Logo />
      <div className="flex items-center gap-3">
        <p className="text-slate-700 dark:text-white">Hi, Seller</p>
      </div>
    </div>
  );
};

export default StoreNavbar;
