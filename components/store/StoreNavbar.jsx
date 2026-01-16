"use client";
import Link from "next/link";
import Logo from "../Logo";
import { Menu } from "lucide-react";

const StoreNavbar = ({ onMenuClick }) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-12 py-3 border-b border-slate-200 dark:border-slate-700 transition-all">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu Button - Only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden dark:text-white text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
        >
          <Menu size={24} />
        </button>
        <Logo />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-slate-700 dark:text-white text-sm sm:text-base">
          Hi, Seller
        </p>
      </div>
    </div>
  );
};

export default StoreNavbar;
