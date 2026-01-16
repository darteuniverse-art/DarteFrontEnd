"use client";

import { Search, ShoppingCart, Menu } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";
import MobileMenuDrawer from "./MobileMenuDrawer";
import UserProfileMenu from "./UserProfileMenu";
import useClickOutside from "../hooks/useClickOutside";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showName, setShowName] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const cartCount = useSelector((state) => state.cart.total);
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close profile menu when clicking outside of the avatar/menu wrapper
  useClickOutside(profileMenuRef, () => setOpenMenu(false), openMenu);

  if (status === "loading") {
    return (
      <nav className="relative dark:bg-gray-900 bg-white">
        <div className="mx-6 py-4 text-center text-slate-600">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="relative dark:bg-gray-900 bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-8 dark:text-white text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 dark:bg-slate-50 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none dark:text-slate-600 text-slate-600 placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 dark:text-white text-slate-600"
            >
              <ShoppingCart size={18} />
              Cart
              <span className="absolute -top-1 left-3 text-[8px] text-white bg-green-500 size-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* Login or Profile */}
            {!isLoggedIn ? (
              <button
                onClick={goToLogin}
                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                {/* Profile Image */}
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onMouseEnter={() => setShowName(true)}
                  onMouseLeave={() => setShowName(false)}
                  onClick={() => setOpenMenu((prev) => !prev)}
                />

                {/* Hover Name Popup */}
                {showName && !openMenu && (
                  <div className="absolute right-0 top-12 bg-white text-black text-xs px-3 py-1 rounded-md shadow-lg">
                    {session.user?.name}
                  </div>
                )}

                {/* Dropdown Menu */}
                <UserProfileMenu
                  session={session}
                  isOpen={openMenu}
                  onClose={() => setOpenMenu(false)}
                />
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart
                size={20}
                className="dark:text-white text-slate-600"
              />
              <span className="absolute -top-1 -right-1 text-[8px] text-white bg-green-500 size-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="dark:text-white text-slate-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        isLoggedIn={isLoggedIn}
        session={session}
        cartCount={cartCount}
      />
    </nav>
  );
};

export default Navbar;
