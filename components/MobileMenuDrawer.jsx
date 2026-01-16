"use client";

import {
  Search,
  ShoppingCart,
  Settings,
  Package,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

const MobileMenuDrawer = ({
  isOpen,
  onClose,
  isLoggedIn,
  session,
  cartCount,
}) => {
  const router = useRouter();
  const [mobileSearch, setMobileSearch] = useState("");

  const handleMobileSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${mobileSearch}`);
    onClose();
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white text-slate-800">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="dark:text-white text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          {/* User Profile Section */}
          {isLoggedIn && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold dark:text-white text-slate-800">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <form onSubmit={handleMobileSearch} className="relative">
              <input
                type="text"
                placeholder="Search products"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-full bg-slate-100 dark:bg-gray-800 dark:text-white text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Search
                  size={18}
                  className="text-slate-600 dark:text-gray-400"
                />
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col p-2">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
            >
              Contact
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
            >
              <ShoppingCart size={18} />
              Cart
              <span className="ml-auto text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Account Section */}
          {isLoggedIn && (
            <>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col p-2">
                <button
                  onClick={() => {
                    onClose();
                    router.push("/account");
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
                >
                  <Settings size={18} />
                  Manage Account
                </button>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/orders");
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-slate-700"
                >
                  <Package size={18} />
                  My Orders
                </button>
              </div>
            </>
          )}

          {/* Bottom Section */}
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  onClose();
                  goToLogin();
                }}
                className="w-full px-8 py-3 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full font-medium"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuDrawer;
