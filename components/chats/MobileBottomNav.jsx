"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Users, Package } from "lucide-react";

export default function MobileBottomNav({ activeTab }) {
  const isChats = activeTab === "chats";
  const isCommunities = activeTab === "communities";
  const isOrders = activeTab === "orders";

  const iconClasses = (active) =>
    `w-6 h-6 transition-colors ${
      active
        ? "fill-green-600 text-green-600 dark:fill-green-500 dark:text-green-500"
        : "text-slate-500 dark:text-slate-400"
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around py-3 pb-safe z-50">
      <Link href="/chats" className="flex flex-col items-center gap-1 w-full">
        <MessageCircle className={iconClasses(isChats)} />
        <span
          className={`text-[10px] font-medium ${
            isChats ? "text-green-600 dark:text-green-500" : "text-slate-500"
          }`}
        >
          Chats
        </span>
      </Link>

      <Link
        href="/chats/communities"
        className="flex flex-col items-center gap-1 w-full"
      >
        <Users className={iconClasses(isCommunities)} />
        <span
          className={`text-[10px] font-medium ${
            isCommunities
              ? "text-green-600 dark:text-green-500"
              : "text-slate-500"
          }`}
        >
          Communities
        </span>
      </Link>

      <Link
        href="/chats/orders"
        className="flex flex-col items-center gap-1 w-full"
      >
        <Package className={iconClasses(isOrders)} />
        <span
          className={`text-[10px] font-medium ${
            isOrders ? "text-green-600 dark:text-green-500" : "text-slate-500"
          }`}
        >
          Orders
        </span>
      </Link>
    </div>
  );
}
