"use client";

import React from "react";
import { Settings, Package, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserProfileMenu({ session, isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-60 origin-top-right rounded-lg bg-white dark:bg-slate-950 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50 focus:outline-none">
      {/* SECTION 1: USER INFO */}
      <div className="p-3.5">
        <div className="flex items-center gap-3">
          <img
            src={session.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border border-gray-100 dark:border-slate-800 object-cover"
          />
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {session.user?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 dark:bg-slate-800 mx-1" />

      {/* SECTION 2: NAVIGATION */}
      <div className="p-1">
        <button
          onClick={() => {
            onClose();
            router.push("/account");
          }}
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
        >
          <Settings
            size={16}
            className="text-gray-400 group-hover:text-gray-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors"
          />
          Manage Account
        </button>

        <button
          onClick={() => {
            onClose();
            router.push("/orders");
          }}
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors"
        >
          <Package
            size={16}
            className="text-gray-400 group-hover:text-gray-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-colors"
          />
          My Orders
        </button>
      </div>

      <div className="h-px bg-gray-100 dark:bg-slate-800 mx-1" />

      {/* SECTION 3: SIGN OUT */}
      <div className="p-1">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut
            size={16}
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
          Sign Out
        </button>
      </div>
    </div>
  );
}
