"use client";
import React from "react";
import Logo from "../Logo";
import { Menu } from "lucide-react";

const AdminNavbar = ({ onMenuClick }) => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-12 py-3 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden dark:text-white text-slate-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
        >
          <Menu size={24} />
        </button>
        <Logo />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-slate-500 dark:text-slate-400">Hi, Admin</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
