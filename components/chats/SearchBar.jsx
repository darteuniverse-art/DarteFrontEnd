"use client";

import { Search } from "lucide-react";
import React from "react";

export default function SearchBar({ activeTab }) {
  const placeholder = activeTab === "Orders" ? "Search orders..." : "Search...";
  return (
    <div className="px-3 py-3 shrink-0">
      <form className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm rounded-full p-3 focus:outline-none focus:ring-1 focus:ring-green-500 flex items-center gap-2">
        <Search size={18} className="text-slate-600" />
        <input
          className="bg-transparent outline-none  flex-1 "
          type="text"
          placeholder={placeholder}
        />
      </form>
    </div>
  );
}
