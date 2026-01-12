"use client";
import Link from "next/link";
import React from "react";
import Logo from "../Logo";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 dark:border-slate-700">
      <Logo />
      <div className="flex items-center gap-3">
        <p className="text-slate-500 dark:text-slate-400">Hi, Admin</p>
      </div>
    </div>
  );
};

export default AdminNavbar;
