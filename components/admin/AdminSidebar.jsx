"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  HomeIcon,
  ShieldCheckIcon,
  StoreIcon,
  TicketPercentIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "../../assets/assets";

const AdminSidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Stores", href: "/admin/stores", icon: StoreIcon },
    { name: "Approve Store", href: "/admin/approve", icon: ShieldCheckIcon },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercentIcon },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <div className="hidden md:inline-flex h-full flex-col gap-5 border-r border-slate-200 dark:border-slate-700 sm:min-w-60">
        <div className="flex flex-col gap-3 justify-center items-center pt-8">
          <Image
            className="w-14 h-14 rounded-full"
            src={assets.gs_logo}
            alt=""
            width={80}
            height={80}
          />
          <p className="text-slate-700 dark:text-white">Hi, GreatStack</p>
        </div>

        <div>
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`relative flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 p-2.5 transition ${
                pathname === link.href &&
                "bg-slate-100 sm:text-slate-600 dark:bg-slate-700 sm:dark:text-white"
              }`}
            >
              <link.icon size={18} className="sm:ml-5" />
              <p className="max-sm:hidden">{link.name}</p>
              {pathname === link.href && (
                <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
              )}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      >
        <div
          className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Image
                className="w-10 h-10 rounded-full shadow-md"
                src={assets.gs_logo}
                alt=""
                width={80}
                height={80}
              />
              <p className="text-slate-700 dark:text-white font-medium">
                Hi, GreatStack
              </p>
            </div>
            <button
              onClick={onClose}
              className="dark:text-white text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col p-2 mt-4">
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={handleLinkClick}
                className={`relative flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 p-3.5 rounded-lg transition ${
                  pathname === link.href &&
                  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-white"
                }`}
              >
                <link.icon size={20} />
                <p className="font-medium">{link.name}</p>
                {pathname === link.href && (
                  <span className="absolute bg-green-500 right-0 top-2 bottom-2 w-1 rounded-l"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
