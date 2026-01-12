"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Users, Package } from "lucide-react";

export default function TopNav({ activeTab }) {
  const isChats = activeTab === "chats";
  const isCommunities = activeTab === "communities";
  const isOrders = activeTab === "orders";

  const iconClasses = (active) =>
    `w-6 h-6 transition-colors ${
      active
        ? "fill-green-600 text-green-600 dark:fill-green-500 dark:text-green-500"
        : "text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-500"
    }`;

  return (
    <div className="hidden md:flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
      <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
      <div className="flex gap-6">
        <Link href="/chats" className="flex items-center justify-center">
          <MessageCircle className={iconClasses(isChats)} />
        </Link>
        <Link
          href="/chats/communities"
          className="flex items-center justify-center"
        >
          <Users className={iconClasses(isCommunities)} />
        </Link>
        <Link href="/chats/orders" className="flex items-center justify-center">
          <Package className={iconClasses(isOrders)} />
        </Link>
      </div>
    </div>
  );
}
